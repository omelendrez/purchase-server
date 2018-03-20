"use strict";
const purchase_orders = require("../controllers/purchase_orders");
const express = require("express");
const router = express.Router();

router.use(function(req, res, next) {
  console.log("%s %s %s", req.method, req.url, req.path);
  next();
});
router.get("/:id", purchase_orders.findAll);
router.post("/", purchase_orders.create);
router.delete("/:id", purchase_orders.delete);
router.put("/:id", purchase_orders.update);

module.exports = router;
