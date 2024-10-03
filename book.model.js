const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database(":memory:");

db.serialize(() => {
  db.run(`
    CREATE TABLE Book (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      author TEXT NOT NULL,
      copies INTEGER NOT NULL CHECK (copies >= 0)
    )
  `);
});

const getAllBooks = (callback) => {
  db.all("SELECT * FROM Book", [], (err, rows) => {
    callback(err, rows);
  });
};

const getBookById = (id, callback) => {
  db.get("SELECT * FROM Book WHERE id = ?", [id], (err, row) => {
    callback(err, row);
  });
};

const createBook = (book, callback) => {
  const { title, author, copies } = book;
  db.run(
    "INSERT INTO Book (title, author, copies) VALUES (?, ?, ?)",
    [title, author, copies],
    function (err) {
      callback(err, this.lastID);
    }
  );
};

const updateBook = (id, book, callback) => {
  const { title, author, copies } = book;
  db.run(
    "UPDATE Book SET title = ?, author = ?, copies = ? WHERE id = ?",
    [title, author, copies, id],
    function (err) {
      callback(err, this.changes);
    }
  );
};

const deleteBook = (id, callback) => {
  db.run("DELETE FROM Book WHERE id = ?", [id], function (err) {
    callback(err, this.changes);
  });
};

module.exports = {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
};