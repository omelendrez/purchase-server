"use strict";
const organizations = require("../controllers/organizations");
const express = require("express");
const router = express.Router();

router.use(function(req, res, next) {
  console.log("%s %s %s", req.method, req.url, req.path);
  next();
});
router.get("/:id", organizations.findAll);
router.post("/", organizations.create);
router.put("/:id", organizations.update);
router.delete("/:id", organizations.delete);

module.exports = router;