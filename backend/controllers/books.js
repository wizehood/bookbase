const config = require("config");
const jwt = require("jsonwebtoken");
const _ = require("lodash");
const express = require("express");
const router = express.Router();
const { Book } = require("../models/book");
const auth = require("../middleware/auth");

router.get("/", auth, async (req, res) => {
  const token = req.header("x-auth-token");
  const decoded = jwt.verify(token, config.get("jwtPrivateKey"));

  const books = await Book.find({ userId: decoded._id }).sort({ _id: -1 });
  res
    .status(200)
    .send(_.map(books, book => _.pick(book, ["_id", "title", "author", "pageNumber", "description", "isAvailable"])));
});

router.get("/:id", auth, async (req, res) => {
  const token = req.header("x-auth-token");
  const decoded = jwt.verify(token, config.get("jwtPrivateKey"));

  const book = await Book.findOne({ userId: decoded._id, _id: req.params.id });
  if (!book) {
    return res.status(404).send("The book with the given ID was not found");
  }
  res.status(200).send(_.pick(book, ["_id", "title", "author", "pageNumber", "description", "isAvailable"]));
});

router.post("/", auth, async (req, res) => {
  const token = req.header("x-auth-token");
  const decoded = jwt.verify(token, config.get("jwtPrivateKey"));

  let book = req.body;
  book.userId = decoded._id;
  book = new Book(book);
  await book.save();

  res.status(200).send(_.pick(book, ["_id", "title", "author", "pageNumber", "description", "isAvailable"]));
});

router.patch("/", auth, async (req, res) => {
  const book = await Book.findByIdAndUpdate(
    req.body._id,
    req.body,
    { new: true }
  );
  if (!book) {
    return res.status(404).send("The book with the given ID was not found");
  }
  await book.save();

  res.status(200).send(_.pick(book, ["_id", "title", "author", "pageNumber", "description", "isAvailable"]));
});

router.patch("/toggle", auth, async (req, res) => {
  let book = await Book.findById(req.body._id);
  book.isAvailable = !book.isAvailable;
  await book.save();

  if (!book) {
    return res.status(404).send("The book with the given ID was not found");
  }
  await book.save();

  res.status(200).send(_.pick(book, ["_id", "title", "author", "pageNumber", "description", "isAvailable"]));
});

router.delete("/", auth, async (req, res) => {
  const book = await Book.findByIdAndRemove(req.body._id);
  if (!book) {
    return res.status(404).send("The book with the given ID was not found");
  }

  res.status(200).send(_.pick(book, ["_id", "title", "author", "pageNumber", "description", "isAvailable"]));
});

module.exports = router;
