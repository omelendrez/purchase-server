"use strict";
const units = require("../controllers/units");
const express = require("express");
const router = express.Router();

router.use(function (req, res, next) {
  console.log("%s %s %s", req.method, req.url, req.path);
  next();
});
router.get("/", units.findAll);
router.post("/", units.create);
router.delete("/:id", units.delete);
router.put("/:id", units.update);
module.exports = router;
