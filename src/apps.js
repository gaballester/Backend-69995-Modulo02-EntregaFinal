import express from 'express'
import 'dotenv/config' 
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
import productService from './services/product.service.js'

const PORT = process.env.PORT
const app  = express()

// middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static("./src/public"));
app.use(cookieParser()); 
app.use(passport.initialize()); 
initializePassport(); 

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

io.on("connection", async (socket) => {
  console.log('One client IO connected')
  socket.emit("products",productService.getProductsPag() )
})





//const httpServer = app.listen(PORT,() => console.log(`Server listening in port ${PORT}`))

//mongodb+srv://process.env. guillermoaballester:<db_password>@cluster0.qxmm2xi.mongodb.net/

//console.log(process.env)