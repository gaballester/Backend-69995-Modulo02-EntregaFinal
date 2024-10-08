import ProductModel from "../models/product.models.js"
import { query } from 'express'

class ProductDao {
    async findById(id) {
        return await ProductModel.findById(id)
    }

    async findOne(query) {
        return await ProductModel.findOne(query)
    }

    //Get product con query, para poder ordenar y filtrar productos.
	getProductsQuery = async (limit, page, sort, category) => {
		try {
            !limit && (limit = 9)
            !page && (page = 1)
            sort === 'asc' && (sort = 1)
            sort === 'des' && (sort = -1)

			// if exists category > create filter with this, otherwise whitout filter
            // example  {"category": "one category value"}
			const filter = category ? { category: category } : {}
			const queryOptions = { limit: limit, page: page, lean: true }

			if (sort === 1 || sort === -1) {
				queryOptions.sort = { price: sort }
			}

            // call pagination method
			const getProducts = await productModel.paginate(filter, queryOptions)
			getProducts.isValid = !(page <= 0 || page > getProducts.totalPages)
			getProducts.prevLink =
				getProducts.hasPrevPage &&
				`?page=${getProducts.prevPage}&limit=${limit}`
			getProducts.nextLink =
				getProducts.hasNextPage &&
				`?page=${getProducts.nextPage}&limit=${limit}`

			getProducts.status = getProducts ? 'success' : 'error'

			return getProducts

		} catch (error) {
			console.log(error.message)
		}
	};

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
