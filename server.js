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

app.use("/organizations", require(apiPath + "/routes/organizations"));
app.use("/profiles", require(apiPath + "/routes/profiles"));
app.use("/permissions", require(apiPath + "/routes/permissions"));
app.use("/status", require(apiPath + "/routes/status"));
app.use("/units", require(apiPath + "/routes/units"));

app.use("/users", require(apiPath + "/routes/users"));
app.use("/login", require(apiPath + "/routes/login"));

app.use("/departments", require(apiPath + "/routes/departments"));
app.use("/locations", require(apiPath + "/routes/locations"));
app.use("/projects", require(apiPath + "/routes/projects"));
app.use("/vendors", require(apiPath + "/routes/vendors"));

app.use("/users_permissions", require(apiPath + "/routes/users_permissions"));
app.use("/workflows", require(apiPath + "/routes/workflows"));
app.use("/workflow_users", require(apiPath + "/routes/workflow_users"));

app.use("/requisitions", require(apiPath + "/routes/requisitions"));
app.use("/requisition_items", require(apiPath + "/routes/requisition_items"));

app.use("/purchase_orders", require(apiPath + "/routes/purchase_orders"));
app.use("/purchase_order_items", require(apiPath + "/routes/purchase_order_items"));

app.use("/document_status", require(apiPath + "/routes/document_status"));

app.use("/approvals", require(apiPath + "/routes/approvals"));

app.use(function (req, res, next) {
  if (!req.route) res.send(404);
  next();
});
const port = process.env.PORT || 3020;

app.set("port", port);

app.listen(app.get("port"), function () {
  console.log("Node app is running on port", app.get("port"));
});
