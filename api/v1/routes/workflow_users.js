"use strict";
const workflow_users = require("../controllers/workflow_users");
const express = require("express");
const router = express.Router();

router.use(function(req, res, next) {
  console.log("%s %s %s", req.method, req.url, req.path);
  next();
});
router.get("/:id", workflow_users.findByWorkflowId);
router.get("/:id/user", workflow_users.findByUserId);
router.get("/:id/type/:type", workflow_users.findByWorkflowActors);
router.post("/", workflow_users.create);
router.delete("/:id", workflow_users.delete);

module.exports = router;
