import productDao from "../daos/product.dao.js"

class ProductRepository {
    async createProduct(prodData){
        return await productDao.save(prodData)
    }

    async getProducts(query,options) {
        return await productDao.paginate(query,options)
    }

    async getProductById(id) {
        return await productDao.findById(id)
    }

    async getProductByCode(code) {
        return await productDao.findOne({code: code})  
    }

    async updateProduct(prodData) {
        return await productDao.update(id,prodData)
    }

    async deleteProduct(id) {
        return await productDao.delete(id)
    }
}

export default new ProductRepository