"use strict";
const requisitions = require("../controllers/requisitions");
const express = require("express");
const router = express.Router();

router.use(function (req, res, next) {
  console.log("%s %s %s", req.method, req.url, req.path);
  next();
});
router.get("/:id", requisitions.findAll);
router.get("/:id/items", requisitions.findItems);
router.post("/", requisitions.create);
router.delete("/:id", requisitions.delete);
router.put("/:id", requisitions.update);
module.exports = router;
