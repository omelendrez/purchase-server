"use strict";
const permissions = require("../controllers/permissions");
const express = require("express");
const router = express.Router();

router.use(function(req, res, next) {
  console.log("%s %s %s", req.method, req.url, req.path);
  next();
});
router.get("/", permissions.findAll);
router.post("/", permissions.create);
router.delete("/:id", permissions.delete);
router.put("/:id", permissions.update);

module.exports = router;
