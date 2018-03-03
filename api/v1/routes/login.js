"use strict";
const users = require("../controllers/users");
const express = require("express");
const router = express.Router();

router.use(function(req, res, next) {
  console.log("%s %s %s", req.method, req.url, req.path);
  next();
});
router.post("/", users.login);

module.exports = router;