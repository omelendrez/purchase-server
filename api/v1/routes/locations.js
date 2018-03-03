"use strict";
const locations = require("../controllers/locations");
const express = require("express");
const router = express.Router();

router.use(function (req, res, next) {
  console.log("%s %s %s", req.method, req.url, req.path);
  next();
});
router.get("/", locations.findAll);
router.post("/", locations.create);
router.delete("/:id", locations.delete);
router.put("/:id", locations.update);
module.exports = router;