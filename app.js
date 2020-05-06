const express = require('express');
const path = require('path');
const session = require('express-session');
const SessionStore = require('connect-mongodb-session')(session);
const flash = require('connect-flash');

const homeRouter = require('./routes/home.route');
const productRouter = require('./routes/product.route');
const cartRouter = require('./routes/cart.route')
const authRouter = require('./routes/auth.route')
const adminRouter = require('./routes/admin.route')

const  PORT = process.env.PORT || 3000;

const app = express();

app.use(express.static(path.join(__dirname, 'assets')));
app.use(express.static(path.join(__dirname, 'img')));
app.use(flash());

const STORE = new SessionStore({
    uri:  'mongodb://localhost:27017/online-shop',
    collection: 'sessions'
})


app.use(session({
    secret: 'myCypher',
    saveUninitialized: false,
    store: STORE, 
}))

app.use('/', homeRouter);
app.use('/', authRouter);
app.use('/product', productRouter);
app.use('/cart', cartRouter);
app.use('/admin', adminRouter);

app.set('view engine', 'ejs');
app.set('views', 'views'); //default


app.listen(3000, (err)=> {
    console.log(`Server is listening on port ${PORT}`);
})