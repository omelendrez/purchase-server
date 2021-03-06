"use strict";
const departments = require("../controllers/departments");
const express = require("express");
const router = express.Router();

router.use(function(req, res, next) {
  console.log("%s %s %s", req.method, req.url, req.path);
  next();
});
router.get("/:id", departments.findAll);
router.post("/", departments.create);
router.delete("/:id", departments.delete);
router.put("/:id", departments.update);

module.exports = router;