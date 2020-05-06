const router = require('express').Router();
const bodyParse = require("body-parser");
const check = require('express-validator').check;


const authController = require('../controllers/auth.controller');
const authGuard = require('./guards/auth.guard');


router.get('/signup', authGuard.notAuth, authController.getSignup);

router.post('/signup', authGuard.notAuth,
    bodyParse.urlencoded({ extended: true }),
    check('username').not().isEmpty(),
    check('email').not().isEmpty().withMessage('email is required')
                  .isEmail().withMessage('invalid format'),
    check('password').not().isEmpty().withMessage('email is required')
                     .isLength({min: 6}).withMessage('password must be at least 6 characters'),
    check('confirmPassword').custom((value, {req}) => {
        if(value === req.body.confirmPassword) return true;
        else throw 'passwords dont match'
    }),
    authController.postSingup
)
 
router.get('/login', authGuard.notAuth, authController.getLogin)

router.post('/login', authGuard.notAuth,
    bodyParse.urlencoded({ extended: true }),
    authController.postLogin
)


router.get('/logout', authGuard.isAuth, authController.logout);

module.exports = router;