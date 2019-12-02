const winston = require('winston');
const mongoose = require("mongoose");
const config = require("config");

module.exports = () => {
  const db = config.get("db");
  mongoose
    .connect(db, {
      //set some flags to ignore warnings
      //refer to: https://mongoosejs.com/docs/deprecations.html
      useNewUrlParser: true,
      useFindAndModify: false,
      useCreateIndex: true,
      useUnifiedTopology: true
    })
    .then(() => winston.info(`Connected to ${db}...`));
};
