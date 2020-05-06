const productModel = require('../models/product.model');

exports.getHome = (req, res, next) => {

    let category = req.query.category;
    let validCategory = ['t-shirt', 'shirts', 'cardigans', 'trousers','test'];
    let productPromise;

    if (category && validCategory.includes(category))
        productPromise = productModel.getProductByCategory(category);
    else productPromise = productModel.getAllProducts();

    productPromise.then(products => {
        res.render('index', { 
            products: products,
            isUser: req.session.userId,
            isAdmin: req.session.isAdmin,
            validationError: req.flash('validationError')[0],
         });
    }); 
}