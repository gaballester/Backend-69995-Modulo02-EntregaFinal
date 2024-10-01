import productRepository from "../repositories/products.repository.js"
//new
class ProductsService {

    async addProduct  (prodData) {
        try {
            
            const prodExists = await productRepository.getProductByCode(prodData.code)
            if (prodExists) {
                throw "Error: The value of product Code bust be unique."
            }
            const newProduct = {
                title: prodData.title,
                description: prodData.description,
                price: prodData.price,
                thumbnails: prodData.thumbnails,
                code: prodData.code,
                stock: prodData.stock,
                status: prodData.status,
                category: prodData.category
            }

            await productRepository.createProduct(newProduct)
        } catch (error) {
             throw `Internal Server Error when trying to add product: ${error}`
        }
    }

    async getProductsPag (query,options) {
        try {
            return await productRepository.getProducts(query,options)
        } catch (error) {
            throw `Error while fetching products: ${error}`
        }
    }

    async getProductsQuery (limit, page, sort, category) {
        try {
            console.log('ps',req)
            return await productRepository.getProductsQuery(limit, page, sort, category)
        } catch (error) {
            throw `Error while fetching products: ${error}`
        }  
    }

    async getProductById (id) {
        try {
            const prodExists = await productRepository.getProductById(id)
            if (prodExists) {
                return productExists
            } else {
                throw `The Id product ${id} not found`
            }            
        } catch (error) {
             throw `Error while fetching product by ID: ${error}`
        }
    }

    async upateProduct (id,prodData) {
        try {
            const updtProd = await productRepository.updateProduct(id,prodData)
            if (!updtProd){
                throw 'product to update not found'
            } else {
                return updtProd
            }            
        } catch (error) {
             throw `Error while updating product: ${error}`
        }
    }

    async deleteProduct (id) {
        try {
            const delOK = await productRepository.createProduct(id)
            if (!delOK) {
                throw 'Product to delete not found.'
            } else {
                return `Product with id ${id} has been successfully removed.`
            }                
        } catch (error) {
            throw `Error while deleting product: ${error}`
        }
    }

}

export default new ProductsService
