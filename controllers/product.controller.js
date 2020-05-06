const productsModel = require('../models/product.model');

exports.getProduct = (req, res, next) => {
    // get first product
    productsModel.getFirstProduct()
        .then((product) => {
            res.render('product', {
                product: product,
                isUser: req.session.isUser,
                isAdmin: req.session.isAdmin,
            });
        });
}

exports.getProductById = (req, res, next) => {
    // get id 
    let id = req.params.id;
    // res.send("hello")

    // get product with that id
    productsModel.getProductById(id)
        .then((product) => {
            // render the product page and pass data to it
            res.render('product', {
                product: product,
                isUser: req.session.isUser,
                isAdmin: req.session.isAdmin,
            });
        });
}