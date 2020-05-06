const mongoose = require('mongoose');
const bcrypt = require('bcrypt')

const DB_URL = 'mongodb://localhost:27017/online-shop';

const userSchema = mongoose.Schema({
    username: String,
    email: String,
    password: String,
    isAdmin: {
        type: Boolean,
        default: false,
    },
});

const User = mongoose.model('user', userSchema);

exports.createNewUser = (username, email, password) => {
    // check if email exists
    return new Promise((resolve, reject) => {
        mongoose.connect(DB_URL).then(() => {
            return User.findOne({ email: email })
        }).then(user => {
            if (user) {
                mongoose.disconnect();
                reject('E-mail already exists!');
            }
            else {
                return bcrypt.hash(password, 10);
            }
        }).then(hashedPassword => {
            let newUser = new User({ username: username, password: hashedPassword, email: email });
            return newUser.save();
        }).then(() => {
            mongoose.disconnect();
            resolve('new user created')
        }).catch(err => {
            mongoose.disconnect();
            reject(err);
        });
    })
}

exports.login = (email, password) => {
    return new Promise((resolve, reject) => {
        mongoose.connect(DB_URL)
            .then(() => {
                return User.findOne({ email: email })
            })
            .then(user => {
                if (!user) {
                    mongoose.disconnect();
                    reject('no such user');
                } else {
                    return bcrypt.compare(password, user.password)
                        .then(same => {
                            if (!same) {
                                mongoose.disconnect();
                                reject('incorrect password')
                            } else {
                                mongoose.disconnect();
                                resolve({
                                    id: user._id,
                                    isAdmin: user.isAdmin,
                                })
                            }
                        })
                }
            }).catch(err => {
                mongoose.disconnect();
                reject(err);
            })
    });
}