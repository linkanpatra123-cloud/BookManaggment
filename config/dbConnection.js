const mongoose = require('mongoose');

// DB Connection

const connectDB = async() => {
    mongoose.connect("mongodb+srv://linkan:08@cluster0.bjtycmy.mongodb.net/store")
    .then(() => console.log("Db Connected"))
    .catch(err => console.log(err));
}

module.exports =connectDB;