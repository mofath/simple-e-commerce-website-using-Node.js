const cartModel = require('../models/cart.model');
const validationResult = require('express-validator').validationResult;


exports.postCart = (req, res, next) => {
    if (validationResult(req).isEmpty()) {
        cartModel.addNewItem({
            name: req.body.productName,
            price: req.body.price,
            amount: req.body.amount,
            productId: req.body.productId,
            userId: req.session.userId,
            timestamp: Date.now()
        })
            .then(() => {
                res.redirect(req.body.redirectTo);
            })
            .catch(err => {
                res.redirect("/cart");
            });
    } else {
        req.flash("validationErrors", validationResult(req).array());
        res.redirect(req.body.redirectTo);
    }
};

exports.getCart = (req, res, next) => {
    cartModel
        .getItemByUserId(req.session.userId)
        .then(items => {
            res.render("cart", {
                items: items,
                isUser: true,
                isAdmin: req.session.isAdmin,
            });
        })
        .catch(err => {
            console.log(err);
        });
};

exports.postSave = (req, res, next) => {
    if (validationResult(req).isEmpty()) {
        cartModel
            .editItem(req.body.itemId, {
                amount: req.body.amount,
                timestamp: Date.now()
            })
            .then(() => res.redirect("/cart"))
            .catch(err => console.log(err) );
    } else {
        req.flash("validationErrors", validationResult(req).array());
        res.redirect("/cart");
    }
};

exports.postDelete = (req, res, next) => {
    cartModel.deleteItem(req.body.itemId)
    .then(() => res.redirect("/cart"))
    .catch(err => console.log(err));
};