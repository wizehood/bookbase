const bcrypt = require("bcryptjs");
const _ = require("lodash");
const express = require("express");
const router = express.Router();
const { User } = require("../models/user");

const getUser = email => {
  return new Promise((resolve, reject) => {
    User.findOne({ email }, (err, user) => {
      if (err) reject(err);
      else resolve(user);
    });
  });
};

const comparePassword = (origin, payload) => {
  return new Promise((resolve, reject) => {
    bcrypt.compare(origin, payload, (err, isValid) => {
      if (err) reject(err);
      else resolve(isValid);
    });
  });
};

const generateSalt = () => {
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(10, (err, salt) => {
      if (err) reject(err);
      else resolve(salt);
    });
  });
};

const generatePassword = (plain, salt) => {
  return new Promise((resolve, reject) => {
    bcrypt.hash(plain, salt, (err, password) => {
      if (err) reject(err);
      else resolve(password);
    });
  });
};

const saveUser = user => {
  return new Promise((resolve, reject) => {
    user.save((err, salt) => {
      if (err) reject(err);
      else resolve(salt);
    });
  });
};

router.post("/", (req, res) => {
  const getUserProps = () =>
    getUser(req.body.email).then(user => {
      if (user) {
        return Promise.reject(new Error("User already registered"));
      }
      user = new User(
        _.pick(req.body, [
          "firstName",
          "lastName",
          "email",
          "password",
          "isAdmin"
        ])
      );
      return user;
    });

  Promise.all([getUserProps(), generateSalt()])
    .then(([user, salt]) => {
      generatePassword(user.password, salt)
        .then(password => {
          user.password = password;
          return saveUser(user);
        })
        .then(() => {
          const token = user.generateAuthToken();
          return res
            .status(200)
            .header("x-auth-token", token)
            .send(_.pick(user, ["_id", "firstName", "lastName", "email"]));
        })
        .catch(err => res.status(400).send(err.message));
    })
    .catch(err => res.status(400).send(err.message));
});

router.post("/me", (req, res) => {
  getUser(req.body.email)
    .then(user => {
      if (!user) {
        return Promise.reject(new Error("Invalid email or password."));
      }
      return Promise.all([
        comparePassword(req.body.password, user.password),
        user
      ]);
    })
    .then(([isValid, user]) => {
      if (!isValid) {
        return Promise.reject(new Error("Invalid email or password."));
      }
      const token = user.generateAuthToken();
      return res.status(200).send(token);
    })
    .catch(err => res.status(400).send(err.message));
});

module.exports = router;
