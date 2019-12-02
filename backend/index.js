const winston = require('winston');
const express = require("express");
const app = express();

require('./startup/logging')();
require("./startup/controllers")(app);
require("./startup/db")();
require("./startup/config")();

const port = process.env.PORT || 3000;
const server = app.listen(port, () =>
  winston.info(`Listening on port ${port}...`)
);

module.exports = server;
