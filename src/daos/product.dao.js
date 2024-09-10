import ProductModel from "../models/product.models.js"
import { query } from 'express'

class ProductDao {
    async findById(id) {
        return await ProductModel.findById(id)
    }

    async findOne(query) {
        return await ProductModel.findOne(query)
    }

    async paginate(query,options) {
        return await ProductModel.paginate(query,options)
    }

    async save(prodData) {
        const product = new ProductModel(prodData)
        return await product.save()
    }

    async update(id,updtData) {
        return await ProductModel.findByIdAndUpdate(id,updtData)
    }

    async delete (id) {
        const deleteOk = await ProductModel.findByIdAndDelete(id) 
        return deleteOk
    }
}

export default new ProductDao
