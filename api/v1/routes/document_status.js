"use strict";
const document_status = require("../controllers/document_status");
const express = require("express");
const router = express.Router();

router.use(function (req, res, next) {
  console.log("%s %s %s", req.method, req.url, req.path);
  next();
});
router.get("/:type/:id", document_status.findByDocumentId);
router.post("/", document_status.create);

module.exports = router;
