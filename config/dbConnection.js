const mongoose = require('mongoose');

// DB Connection

const connectDB = async() => {
    mongoose.connect("mongodb://localhost:27017/store")
    .then(() => console.log("Db Connected"))
    .catch(err => console.log(err));
}

module.exports =connectDB;