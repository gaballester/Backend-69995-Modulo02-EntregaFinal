import productService from "../services/product.service.js";

class ViewsController {

getProducts = async (req, res) => {

    const { limit, page, sort, category } = req.query;
    try {
        const products = await productService.getProductsQuery(limit, page, sort, category);
        res.render('home', { products });
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: error.message });
    }
}

}

export default new ViewsController