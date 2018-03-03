"use strict";
const users = require("../controllers/users");
const express = require("express");
const router = express.Router();

router.use(function (req, res, next) {
  console.log("%s %s %s", req.method, req.url, req.path);
  next();
});
router.get("/:id", users.findById);
router.get("/", users.findAll);
router.post("/", users.create);
router.put("/:id", users.update);
router.delete("/:id", users.delete);
router.put("/:id/password", users.changePassword)

module.exports = router;