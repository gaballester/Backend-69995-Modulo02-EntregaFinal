import express from 'express'
import path from 'path';
import 'dotenv/config' 
import { fileURLToPath } from 'url';
import { engine } from 'express-handlebars'
import { Server } from 'socket.io'
import cookieParser from 'cookie-parser'
//import { Server } from 'socket.io'
import passport from 'passport'
import initializePassport from './config/passport.config.js'
import { viewsRouter } from './routes/views.router.js'
import sessionRouter from './routes/session.router.js'
import prodRouter from './routes/product.router.js'
import "./database.js";
//import productService from './services/product.service.js'

const PORT = process.env.PORT
const app  = express()

// middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static("./src/public"));
app.use(cookieParser()); 
app.use(passport.initialize()); 
initializePassport(); 

/* app.use(express.static("./src/public")) */
const __filename = fileURLToPath(import.meta.url);  // get the resolved path to the file
const __dirname = path.dirname(__filename);         // get the name of the directory
app.use('/static', express.static(path.join(__dirname, 'public')))


// express-handlebars
app.engine("handlebars",engine())
app.set("view engine","handlebars")
app.set("views","./src/views")

// routes
app.use('/api/sessions', sessionRouter)
app.use('/', viewsRouter)
app.use("/api/products", prodRouter)
//app.use("/api/carts", cartsRouter)


const httpServer = app.listen(PORT, () => {
    console.log(`🔥 Server is running at port ${PORT}`);
  });
 
const io = new Server(httpServer)

/* io.on("connection", (socket) => {
  console.log('One client IO connected for products')

  socket.on("error", (error) => {
    console.error("Socket error:", error)
  })

  socket.emit("products",viewsRouter.getProductsQuery )

}) */

io.on("connection", async (socket) => {

  console.log('One client connected')

  socket.emit("products", await productManager.getProducts())

  socket.on("dropProduct", async (id) => {           
      try {
          // drop client indicated product
          console.log("main",id)
          await productManager.deleteProduct(id)
          // return all new product lists 
          socket.emit("products", await productManager.getProducts())
      } catch (error) {
          console.error("Drop Product Error:", error);
          // possible client error send
      }
  })

  socket.on("addProduct", async (product) => {
      try {
          console.log(product)
          await productManager.addProduct(product)  
          // return all new product lists 
          socket.emit("products", await productManager.getProducts())
      } catch (error) {
          console.error("Add Product Error:", error);
          // possible client error send           
      }
  })
      
})


//const httpServer = app.listen(PORT,() => console.log(`Server listening in port ${PORT}`))

//mongodb+srv://process.env. guillermoaballester:<db_password>@cluster0.qxmm2xi.mongodb.net/

//console.log(process.env)