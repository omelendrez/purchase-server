"use strict";
const profiles = require("../controllers/profiles");
const express = require("express");
const router = express.Router();

router.use(function(req, res, next) {
  console.log("%s %s %s", req.method, req.url, req.path);
  next();
});
router.get("/:id", profiles.findAll);
router.post("/", profiles.create);
router.put("/:id", profiles.update);
router.delete("/:id", profiles.delete);

module.exports = router;