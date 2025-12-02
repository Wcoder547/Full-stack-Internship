// server/routes/books.js
const express = require('express');
const router = express.Router();
const booksController = require('../controllers/book.controller');

// Route base: /api/books (we'll mount in server.js)
router.get('/', booksController.getAllBooks);
router.get('/:id', booksController.getBookById);
router.post('/', booksController.createBook);
router.delete('/:id', booksController.deleteBook);

module.exports = router;
