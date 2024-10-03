const bookModel = require("./book.model.js");

const getAllBooks = (callback) => {
  bookModel.getAllBooks(callback);
};

const getBookById = (id, callback) => {
  bookModel.getBookById(id, callback);
};

const createBook = (book, callback) => {
  if (!book.title || !book.author || book.copies < 0) {
    return callback(new Error("Invalid book data"));
  }
  bookModel.createBook(book, callback);
};

const updateBook = (id, book, callback) => {
  if (!book.title || !book.author || book.copies < 0) {
    return callback(new Error("Invalid book data"));
  }
  bookModel.updateBook(id, book, callback);
};

const deleteBook = (id, callback) => {
  bookModel.deleteBook(id, callback);
};

module.exports = {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
};