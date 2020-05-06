const mongoose = require('mongoose')

const DB_URL = 'mongodb://localhost:27017/online-shop';

const config = {
    autoIndex: false,
    useNewUrlParser: true,
};

const cartSchema = mongoose.Schema({
    name: String,
    price: String,
    amount: String,
    userId: String,
    productId: String,
    timeStamp: Number,
});

const cartItem = mongoose.model('cart', cartSchema);

exports.addNewItem = data => {
    console.log("inside add newitem");
    return new Promise((resolve, reject) => {
        mongoose
            .connect(DB_URL, { config })
            .then(() => {
                let item = new cartItem(data);
                return item.save();
            })
            .then(() => {
                mongoose.disconnect();
                resolve('new added');
            })
            .catch(err => {
                console.log("catched error");
                console.log("error: ", err);
                mongoose.disconnect();
                reject(err);
            });
    });
};

exports.getItemByUserId = (userId) => {
    return new Promise((resolve, reject) => {
        mongoose.connect(DB_URL)
            .then(() => {
                return cartItem.find({ userId }, {}, { sort: { timeStamp: 1 } })
            })
            .then(items => {
                mongoose.disconnect();
                resolve(items);
            })
            .catch((err) => {
                console.log(err);
                reject(err);
            });
    });
};


exports.editItem = (id, newData) => {
    return new Promise((resolve, reject) => {
        mongoose
            .connect(DB_URL)
            .then(() => cartItem.updateOne({ _id: id }, newData))
            .then(items => {
                mongoose.disconnect();
                resolve(items);
            })
            .catch(err => {
                mongoose.disconnect();
                console.log(err);
                reject(err);
            });
    });
};


exports.deleteItem = id => {
    return new Promise((resolve, reject) => {
        mongoose.connect(DB_URL)
            .then(() => {
                cartItem.findOneAndDelete({ _id: id })
                    .then(() => {
                        console.log(`delete item with id: ${id}`);
                    }).catch((err) => {
                        console.log(err);
                    })
            })
            .catch(err => {
                mongoose.disconnect();
                console.log(err);
            });
    });
};
