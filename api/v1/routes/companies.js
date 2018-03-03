"use strict";
const companies = require("../controllers/companies");
const express = require("express");
const router = express.Router();

router.use(function(req, res, next) {
  console.log("%s %s %s", req.method, req.url, req.path);
  next();
});
router.get("/", companies.findAll);
router.post("/", companies.create);
router.put("/:id", companies.update);
router.delete("/:id", companies.delete);

module.exports = router;