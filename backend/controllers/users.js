const config = require("config");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const _ = require("lodash");
const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { User } = require("../models/user");

router.get("/", auth, async (req, res) => {
  const token = req.header("x-auth-token");
  const decoded = jwt.verify(token, config.get("jwtPrivateKey"));
  const user = await User.findById(decoded._id);

  res.status(200).send(_.pick(user, ["firstName", "lastName", "email"]));
});

router.patch("/", auth, async (req, res) => {
  const token = req.header("x-auth-token");
  const decoded = jwt.verify(token, config.get("jwtPrivateKey"));

  const { firstName, lastName, email } = req.body;
  const user = await User.findByIdAndUpdate(
    decoded._id,
    {
      firstName,
      lastName,
      email
    },
    { new: true }
  );

  if (!user) {
    return res.status(404).send("The user with the given ID was not found");
  }
  res.status(200).send(_.pick(user, ["_id", "firstName", "lastName", "email"]));
});

router.patch("/password", auth, async (req, res) => {
  const token = req.header("x-auth-token");
  const decoded = jwt.verify(token, config.get("jwtPrivateKey"));

  const salt = await bcrypt.genSalt(10);
  const password = await bcrypt.hash(req.body.password, salt);

  const user = await User.findByIdAndUpdate(
    decoded._id,
    { password },
    { new: true }
  );

  if (!user) {
    return res.status(404).send("The user with the given ID was not found");
  }
  res.status(200).send(_.pick(user, ["_id", "firstName", "lastName", "email"]));
});

module.exports = router;
