"use strict";
const PurchaseOrderItems = require("../models").purchase_order_items;
const sequelize = require("sequelize");
const constants = require("../lib/constants");

module.exports = {
  create(req, res) {
    const totalAmount =
      parseFloat(req.body.quantity) * parseFloat(req.body.unit_price);
    return PurchaseOrderItems.create({
      purchase_order_id: req.body.purchase_order_id,
      description: req.body.description,
      unit_id: req.body.unit_id,
      quantity: req.body.quantity,
      unit_price: req.body.unit_price,
      total_amount: totalAmount
    })
      .then(purchase_order_items => res.status(201).json(purchase_order_items))
      .catch(error => res.status(400).send(error));
  },
  findByPurchaseOrderId(req, res) {
    const Units = require("../models").units;
    PurchaseOrderItems.belongsTo(Units);

    PurchaseOrderItems.findAndCountAll({
      raw: true,
      where: {
        purchase_order_id: req.params.id
      },
      order: [["id", "ASC"]],
      include: [
        {
          model: Units,
          attributes: ["name"]
        }
      ],
      attributes: [
        "id",
        "description",
        "unit_id",
        "quantity",
        "unit_price",
        "total_amount",
        "purchase_order_id",
        [
          sequelize.fn(
            constants.DATE_FORMAT_FUNCTION,
            sequelize.col("purchase_order_items.created_at"),
            constants.DATE_FORMAT_PARAMS
          ),
          "created_at"
        ],
        [
          sequelize.fn(
            constants.DATE_FORMAT_FUNCTION,
            sequelize.col("purchase_order_items.updated_at"),
            constants.DATE_FORMAT_PARAMS
          ),
          "updated_at"
        ]
      ]
    })
      .then(purchase_order_items => res.json(purchase_order_items))
      .catch(error => res.status(400).send(error));
  },
  delete(req, res) {
    return PurchaseOrderItems.findOne({
      where: {
        id: req.params.id
      }
    })
      .then(purchase_order_items =>
        purchase_order_items.destroy().then(() => {
          res.json({ status: true });
        })
      )
      .catch(error => res.status(400).send(error));
  },

  update(req, res) {
    const totalAmount =
      parseFloat(req.body.quantity) * parseFloat(req.body.unit_price);

    return PurchaseOrderItems.findOne({
      where: {
        id: req.params.id
      }
    })
      .then(purchase_order_items =>
        purchase_order_items
          .update({
            description: req.body.description,
            unit_id: req.body.unit_id,
            quantity: req.body.quantity,
            unit_price: req.body.unit_price,
            total_amount: totalAmount
          })
          .then(result => {
            res.json(result);
          })
      )
      .catch(error => res.status(400).send(error));
  }
};
