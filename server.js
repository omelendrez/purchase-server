"use strict";
const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");
const apiPath = "./api/v1";
const models = require(apiPath + "/models");

const app = express();

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(logger("combined"));

models.sequelize.sync({
  force: false
});
/*
models.availability.sequelize.sync({
  force: true
});
*/

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

app.use("/locations", require(apiPath + "/routes/locations"));
app.use("/positions", require(apiPath + "/routes/positions"));
app.use("/profiles", require(apiPath + "/routes/profiles"));
app.use("/status", require(apiPath + "/routes/status"));
app.use("/users", require(apiPath + "/routes/users"));

app.use("/login", require(apiPath + "/routes/login"));

app.use(function (req, res, next) {
  if (!req.route)
    res.send(404);
  next();
});
const port = process.env.PORT || 3020;

app.set("port", port);

app.listen(app.get("port"), function () {
  console.log("Node app is running on port", app.get("port"));
});
