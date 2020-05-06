const mongoose = require('mongoose');

const DB_URL = 'mongodb://localhost:27017/online-shop';

const productSchema = mongoose.Schema({
    name: String,
    image: String,
    price: Number,
    description: String,
    category: String,
})

const Product = mongoose.model('product', productSchema);

// function that returns all peoducts and retuns promise object
module.exports.getAllProducts = () => {
    return new Promise((resolve, reject) => {
        //connect to db
        mongoose.connect(DB_URL).then(() => {
            return Product.find({}) //get products
        }).then(products => {
            mongoose.disconnect() // disconnect
            resolve(products)
        }).catch(err => reject(err))
    });
}

// function that gets peoducts by category and retuns promise object
module.exports.getProductByCategory = (category) => {
    return new Promise((resolve, reject) => {
        //connect to db
        mongoose.connect(DB_URL)
            .then(() => {
                return Product.find({ category: category }) //get products
            })
            .then(products => {
                mongoose.disconnect() // disconnect
                resolve(products)
            })
            .catch(err => reject(err))
    });
};

// function that gets peoducts by id and retuns promise object
exports.getProductById = (id) => {
    return new Promise((resolve, reject) => {
        mongoose.connect(DB_URL)
        .then(() => {
            return Product.findById(id)
        })
        .then(product => {
            mongoose.disconnect();
            resolve(product);
        })
        .catch(err => reject(err));
    });
}


exports.getFirstProduct = () => {
    return new Promise((resolve, reject) => {
        mongoose.connect(DB_URL)
        .then(() => {
            return Product.findOne({})
        })
        .then(product => {
            mongoose.disconnect();
            resolve(product);
        })
        .catch(err => reject(err));
    });
}