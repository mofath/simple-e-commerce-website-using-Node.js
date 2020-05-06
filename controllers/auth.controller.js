const authMdel = require('../models/auth.model');
const validationResult = require('express-validator').validationResult;

exports.getSignup = (req, res, next) => {
    res.render('signup', {
        authError: req.flash('authError')[0],
        validationError: req.flash('validationError'),
        isUser: false,
        isAdmin: false,
    });

}

exports.postSingup = (req, res, next) => {
    if(validationResult(req).isEmpty()){
        authMdel.createNewUser(req.body.username, req.body.email, req.body.password)
        .then(() => {
            res.redirect("/login");
        })
        .catch(() => {
            res.redirect("/signup")
        })
    }
    else{
        req.flash('validationError', validationResult(req).array());
        res.redirect("/signup");
    }

};


exports.getLogin = (req, res, next) => {
    res.render('login', {
        authError: req.flash('authError')[0], 
        isUser: false,
        isAdmin: false,
    });
}

exports.postLogin = (req, res, next) => {
    authMdel.login(req.body.email, req.body.password)
        .then(userDataRecieved => {
            req.session.userId = userDataRecieved.id;
            req.session.isAdmin = userDataRecieved.isAdmin;
            res.redirect("/");
        })
        .catch(err => {
            console.log(err);
            req.flash('authError', err)
            res.redirect("/login")
        })
};


exports.logout = (req, res, next) => {
    req.session.destroy((err) => {
        if (err) {
            console.log(err);
        } else {
            res.redirect('/');
        }
    })
}
