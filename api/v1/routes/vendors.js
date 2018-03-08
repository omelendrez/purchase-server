"use strict";
const vendors = require("../controllers/vendors");
const express = require("express");
const router = express.Router();

router.use(function(req, res, next) {
  console.log("%s %s %s", req.method, req.url, req.path);
  next();
});
router.get("/:id", vendors.findAll);
router.post("/", vendors.create);
router.delete("/:id", vendors.delete);
router.put("/:id", vendors.update);

module.exports = router;
