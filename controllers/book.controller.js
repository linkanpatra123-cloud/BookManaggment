const Book = require('../models/book-model');
const fs = require('fs');
const path = require('path');

exports.findBook = async (req, res) => {
    try {
        let { search, sortby = "price", sortorder = "asc" } = req.query;

        let filter = {};
        if (search) {
            filter = {
                $or: [
                    { title: { $regex: search, $options: "i" } },
                    { author: { $regex: search, $options: "i" } }
                ]
            };
        }

        let sortOrder = {
            [sortby]: sortorder === "asc" ? 1 : -1
        };
        const books = await Book.find(filter).sort(sortOrder);
        return res.json({ message: "All Books Fetched", books });
    } catch (error) {
        console.log(error);
        res.json({ message: "Server Error" });
    }
};

exports.getAllBook = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) return res.json({ message: "Book not found" });
        res.json(book);
    } catch {
        res.json({ message: "Server Error" });
    }
};

exports.addBook = async (req, res) => {
    try {
        let imagePath = "";
        if (req.file) {
            imagePath = `/uploads/${req.file.filename}`;
        }
        const book = await Book.create({
            ...req.body,
            image: imagePath
        });
        res.json({ message: "Book Created", book });
    } catch {
        res.json({ message: "Server Error" });
    }
};

exports.updateBook = async (req, res) => {
    try {
        const existingBook = await Book.findById(req.params.id);
        if (!existingBook) {
            return res.json({ message: "Book not found" });
        }
        let imagePath = existingBook.image;

        if (req.file) {
            if (existingBook.image) {
                const oldPath = path.join(__dirname, '..', existingBook.image);
                if (fs.existsSync(oldPath)) {
                    fs.unlinkSync(oldPath);
                }
            }
            imagePath = `/uploads/${req.file.filename}`;
        }

        const updatedBook = await Book.findByIdAndUpdate(
            req.params.id,
            {
                ...req.body,
                image: imagePath
            },
            { returnDocument: 'after' }
        );
        res.json({ message: "Book Updated", updatedBook });
    } catch (err) {
        console.log(err);
        res.json({ message: "Server Error" });
    }
};

exports.deleteBook = async (req, res) => {
    try {
        const book = await Book.findByIdAndDelete(req.params.id);
        if (!book) return res.json({ message: "Book not found" });

        if (book.image) {
            const filePath = path.join(__dirname, '..', book.image);
            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
            }
        }
        res.json({ message: "Book Deleted" });
    } catch {
        res.json({ message: "Server Error" });
    }
};