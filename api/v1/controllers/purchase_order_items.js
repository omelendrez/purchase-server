"use strict";
const PurchaseOrderItems = require("../models").purchase_order_items;
const sequelize = require("sequelize");
const constants = require("../lib/constants");
const PurchaseOrders = require("../models").purchase_orders

module.exports = {
  create(req, res) {
    const id = req.body.purchase_order_id
    const totalAmount =
      parseFloat(req.body.quantity) * parseFloat(req.body.unit_price);

    return PurchaseOrderItems.create({
      purchase_order_id: id,
      description: req.body.description,
      unit_id: req.body.unit_id,
      quantity: req.body.quantity,
      unit_price: req.body.unit_price,
      total_amount: totalAmount
    })
      .then(purchase_order_items => {
        PurchaseOrderItems.sum('total_amount', {
          where: {
            purchase_order_id: id
          }
        })
          .then(totalAmount => {
            PurchaseOrders
              .findOne({
                where: {
                  id: id
                }
              })
              .then(purchase_order => {
                purchase_order.update({
                  total_amount: totalAmount
                })
                  .then(() => res.status(201).json(purchase_order_items))
                  .catch(error => res.status(400).send(error));

              })
              .catch(error => res.status(400).send(error));
          })
          .catch(error => res.status(400).send(error));
      })
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
        purchase_order_items.destroy().then((item) => {
          PurchaseOrderItems.sum('total_amount', {
            where: {
              purchase_order_id: item.purchase_order_id
            }
          })
            .then(totalAmount => {
              PurchaseOrders
                .findOne({
                  where: {
                    id: item.purchase_order_id
                  }
                })
                .then(purchase_order => {
                  purchase_order.update({
                    total_amount: totalAmount
                  })
                    .then(() => res.json({ status: true }))
                    .catch(error => res.status(400).send(error));
                })
                .catch(error => res.status(400).send(error));
            })
            .catch(error => res.status(400).send(error));
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
          .then(results => {
            PurchaseOrderItems.sum('total_amount', {
              where: {
                purchase_order_id: results.purchase_order_id
              }
            })
              .then(totalAmount => {
                PurchaseOrders
                  .findOne({
                    where: {
                      id: results.purchase_order_id
                    }
                  })
                  .then(purchase_order => {
                    purchase_order.update({
                      total_amount: totalAmount
                    })
                      .then(() => res.status(201).json(results))
                      .catch(error => res.status(400).send(error));

                  })
                  .catch(error => res.status(400).send(error));
              })
              .catch(error => res.status(400).send(error));
          })
      )
      .catch(error => res.status(400).send(error));
  }
};
