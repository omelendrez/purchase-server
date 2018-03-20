"use strict";
const purchase_order_items = require("../controllers/purchase_order_items");
const express = require("express");
const router = express.Router();

router.use(function(req, res, next) {
  console.log("%s %s %s", req.method, req.url, req.path);
  next();
});
router.get("/:id", purchase_order_items.findByPurchaseOrderId);
router.post("/", purchase_order_items.create);
router.delete("/:id", purchase_order_items.delete);
router.put("/:id", purchase_order_items.update);

module.exports = router;
