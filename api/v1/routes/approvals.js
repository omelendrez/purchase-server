"use strict";
const approvals = require("../controllers/approvals");
const express = require("express");
const router = express.Router();

router.use(function (req, res, next) {
  console.log("%s %s %s", req.method, req.url, req.path);
  next();
});
router.get("/:type/:id", approvals.findDocumentById);

module.exports = router;
