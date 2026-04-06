const mongoose = require('mongoose');

const bookSchema = mongoose.Schema({
    title: {
        type: String
    },
    author: {
        type: String
    },
    description: {
        type: String
    },
    price: {
        type: Number,
        min: 0
    }, 
    image: {
        type: String
    }
})

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
