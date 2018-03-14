"use strict";
const users_permissions = require("../controllers/users_permissions");
const express = require("express");
const router = express.Router();

router.use(function (req, res, next) {
  console.log("%s %s %s", req.method, req.url, req.path);
  next();
});
router.get("/:id", users_permissions.findByUserId);
router.post("/", users_permissions.create);
router.delete("/:id", users_permissions.delete);
module.exports = router;