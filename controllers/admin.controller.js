exports.getAddProduct = (req, res, next) => {
    res.render('add-product', {
        validationErorr: req.flash('validationError'),
        isUser: true,
        isAdmin: true,
    })
}