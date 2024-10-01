import ProductModel from "../../models/product.model.js"
//new
class ProductDao {
    async findById(id) {
        return await ProductModel.findById(id)
    }

    async findOne(query) {
        return await ProductModel.findOne(query)
    }


    getProductsQuery = async (filter,queryOptions) => {
		try {
     
            

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
