"use strict";
const requisition_items = require("../controllers/requisition_items");
const express = require("express");
const router = express.Router();

router.use(function (req, res, next) {
  console.log("%s %s %s", req.method, req.url, req.path);
  next();
});
router.post("/", requisition_items.create);
router.get("/:id", requisition_items.findByRequisitionId);
router.delete("/:id", requisition_items.delete);
router.put("/:id", requisition_items.update);
module.exports = router;
