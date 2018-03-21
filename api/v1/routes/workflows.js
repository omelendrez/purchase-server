"use strict";
const workflows = require("../controllers/workflows");
const express = require("express");
const router = express.Router();

router.use(function(req, res, next) {
  console.log("%s %s %s", req.method, req.url, req.path);
  next();
});
router.get("/:id", workflows.findAll);
router.post("/", workflows.create);
router.delete("/:id", workflows.delete);
router.put("/:id", workflows.update);

module.exports = router;
