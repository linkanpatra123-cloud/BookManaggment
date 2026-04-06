const express = require('express')
const routes = express.Router();
const {findBook,getAllBook,addBook,updateBook,deleteBook} = require('../controllers/book.controller');
const bookImage = require('../middleware/BookCover')

routes.get("/book", findBook)

routes.get("/book/:id", getAllBook) 

routes.post("/book",bookImage.single('image'), addBook)

routes.put("/book/:id",bookImage.single('image'), updateBook)

routes.delete("/book/:id", deleteBook);

module.exports = routes;