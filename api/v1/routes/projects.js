"use strict";
const projects = require("../controllers/projects");
const express = require("express");
const router = express.Router();

router.use(function(req, res, next) {
  console.log("%s %s %s", req.method, req.url, req.path);
  next();
});
router.get("/:id", projects.findAll);
router.post("/", projects.create);
router.delete("/:id", projects.delete);
router.put("/:id", projects.update);

module.exports = router;