const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  userId: { type: mongoose.ObjectId, required: true },
  title: { type: String, required: true },
  author: { type: String },
  pageNumber: { type: Number },
  description: { type: String },
  isAvailable: { type: Boolean, default: true }
});

const Book = mongoose.model("Book", bookSchema);

exports.Book = Book;
