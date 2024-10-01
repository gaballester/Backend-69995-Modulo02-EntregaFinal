import productDao from "../daos/db/product.dao.js"
//new
class ProductRepository {
    async createProduct(prodData){
        return await productDao.save(prodData)
    }

    async getProducts(query,options) {
        console.log('repo',query,options)
        console.log('pen',await productDao.paginate(query,options))
        return await productDao.paginate(query,options)
    }
  /*   async getProductsQuery(limit, page, sort, category) {
        return await productDao.getProductsPag(limit, page, sort, category)
    } */

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