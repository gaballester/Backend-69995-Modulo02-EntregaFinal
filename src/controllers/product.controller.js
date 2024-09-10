import productService from "../services/product.service.js"

class ProductController {

    async GetProductsPag (req,res) {
        try {
            const page  = parseInt(req.query.page,10) || 1
            const limit  = parseInt(req.query.limit,10) || 10
            const order  = req.query.sort 
            const category = req.query.category || 'All'
    
            let query = {}
            let sort = {}
    
            if ( category !== 'All' ) {
                query.category = category
            }
            
            switch (order) {
                case '':
                    sort = {}
                    break
                case 'desc':
                    sort = { price: -1 }
                    break
                case 'asc':
                    sort = { price: 1} 
                    break
            }
      
            const options = {page, limit, sort}    
            const productsResult = await productService.getProductsPag(query,options)
            const arrayProducts = productsResult.docs.map( prod => {
                const {_id,...rest} = prod.toObject()
                //return rest
            })
    
            res.send(  {
                status: 'SUCCESS',
                payloads: arrayProducts,
                prevPage: productsResult.prevPage,
                nextPage: productsResult.nextPage,
                hasPrevPage: productsResult.hasPrevPage,
                hasNextPage: productsResult.hasNextPage,
                prevLink: productsResult.nextLink,
                nextLink: productsResult.prevLink,
                currentPage: productsResult.page,
                totalPages: productsResult.totalPages
            }
            )         
        } catch (error) {
            res.status(500).json({ status: 'ERROR' })
        }
    }

    async getProductById (req,res) {
        try {
            const prod = await productService.getProductById(req.params.id)
            res.json(product)
        } catch (error) {
            res.status(500).json({ error: "Internal Server Error - reading one product" })
        }

    }

    async addProduct (req,res) {
        try {
            const response = await productService.addProduct(req.body)
            res.status(200).json({message: "Product added successfully"})
        } catch (error) {
            res.status(500).json({ error: "Internal Server Error - added product" } )
        }

    }

    async updateProduct (req, res) {
        try {
            const response = await productService.upateProduct(req.params.id,req.body)
            res.status(201).json({message: "Product updated successfully"});
        } catch (error) {
            res.status(500).json({ error: "Internal Server Error - update product" })
        }
    }

    async deleteProduct (req,res) {
        try {
            const response = await productService.deleteProduct(req.params.id)
            res.status(200).json({message: "Product successfully deleted"})
        } catch (error) {
            res.status(500).json({ error: "Internal Server Error - deleting product"})
        }
    }

}

export default new ProductController