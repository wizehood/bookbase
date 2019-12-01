const express = require("express");
const cors = require("cors");
const auth = require("../controllers/auth");
const users = require("../controllers/users");
const books = require("../controllers/books");
const error = require("../middleware/error");

module.exports = app => {
  app.use(cors());
  app.use(express.json());
  app.use("/api/auth", auth);
  app.use("/api/users", users);
  app.use("/api/books", books);
  app.use(error);
};
