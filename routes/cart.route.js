const router = require('express').Router();
const podyParser = require('body-parser');
const check = require('express-validator').check;



const cartController = require('../controllers/cart.controller');
const authGuard = require('./guards/auth.guard');

router.get('/', authGuard.isAuth, cartController.getCart);

router.post('/', authGuard.isAuth, podyParser.urlencoded({extended: true}), 
    check('amount').not().isEmpty().withMessage('amount is required')
    .isInt({ min: 1}).withMessage('amount must be greater than 0'),
    cartController.postCart
);  


router.post('/save', authGuard.isAuth, podyParser.urlencoded({extended: true}), 
    check('amount').not().isEmpty().withMessage('amount is required')
    .isInt({ min: 1}).withMessage('amount must be greater than 0'),
    cartController.postSave
); 


router.post('/delete', authGuard.isAuth, podyParser.urlencoded({extended: true}), 
    cartController.postDelete
); 

module.exports = router;