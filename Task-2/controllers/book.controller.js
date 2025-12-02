// server/controllers/booksController.js
const Book = require('../models/book.model');

// GET /books - list all books
exports.getAllBooks = async (req, res) => {
  try {
    const books = await Book.find().sort({ createdAt: -1 });
    res.json({ success: true, count: books.length, data: books });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// GET /books/:id - get one book
exports.getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ success: false, message: 'Book not found' });
    res.json({ success: true, data: book });
  } catch (err) {
    console.error(err);
    if (err.kind === 'ObjectId') {
      return res.status(400).json({ success: false, message: 'Invalid book id' });
    }
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// POST /books - create a new book
exports.createBook = async (req, res) => {
  try {
    const { title, author, genre, pages, publishedDate } = req.body;

    // Basic validation
    if (!title || !author) {
      return res.status(400).json({ success: false, message: 'Title and author are required' });
    }

    const book = await Book.create({
      title,
      author,
      genre,
      pages,
      publishedDate
    });

    res.status(201).json({ success: true, data: book });
  } catch (err) {
    console.error(err);
    // Mongoose validation errors
    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map(e => e.message);
      return res.status(400).json({ success: false, message: messages.join(', ') });
    }
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// DELETE /books/:id - delete a book
exports.deleteBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book) return res.status(404).json({ success: false, message: 'Book not found' });
    res.json({ success: true, message: 'Book deleted', data: book });
  } catch (err) {
    console.error(err);
    if (err.kind === 'ObjectId') {
      return res.status(400).json({ success: false, message: 'Invalid book id' });
    }
    res.status(500).json({ success: false, message: 'Server error' });
  }
};
