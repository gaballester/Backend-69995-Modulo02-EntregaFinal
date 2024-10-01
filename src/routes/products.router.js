import { Router } from 'express'
import productController from '../controllers/products.controller.js'

const productsRouter = Router()


productsRouter.get('/' , productController.GetProductsPag)
productsRouter.get('/:id' , productController.getProductById)
productsRouter.post('/' , productController.addProduct )
productsRouter.put('/:id' , productController.updateProduct)
productsRouter.delete('/:id',productController.deleteProduct)

export default productsRouter