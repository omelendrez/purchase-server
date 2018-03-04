"use strict";
const positions = require("../controllers/positions");
const express = require("express");
const router = express.Router();

router.use(function(req, res, next) {
  console.log("%s %s %s", req.method, req.url, req.path);
  next();
});
router.get("/:id", positions.findAll);
router.post("/", positions.create);
router.put("/:id", positions.update);
router.delete("/:id", positions.delete);

module.exports = router;