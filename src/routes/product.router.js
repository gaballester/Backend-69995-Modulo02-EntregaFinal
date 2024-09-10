import { Router } from 'express'
import productController from '../controllers/product.controller.js'

const prodRouter = Router()


prodRouter.get('/' , productController.GetProductsPag)
prodRouter.get('/:id' , productController.getProductById)
prodRouter.post('/' , productController.addProduct )
prodRouter.put('/:id' , productController.updateProduct)
prodRouter.delete('/:id',productController.deleteProduct)

export default prodRouter