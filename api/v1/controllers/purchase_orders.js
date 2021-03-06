"use strict";
const PurchaseOrders = require("../models").purchase_orders;
const sequelize = require("sequelize");
const constants = require("../lib/constants");

module.exports = {
  create(req, res) {
    let nextNumber = "PO-000001";
    const db = require("./../lib/db");
    db.sequelize
      .query(
        constants.getNextNumber(
          "PO-",
          "purchase_orders",
          req.body.organization_id
        ), {
          type: sequelize.QueryTypes.SELECT
        }
      )
      .then(result => {
        nextNumber =
          result[0].number.length === 9 ? result[0].number : nextNumber;

        return PurchaseOrders.create({
          user_id: req.body.user_id,
          number: nextNumber,
          vendor_id: req.body.vendor_id,
          date: req.body.date,
          location_id: req.body.location_id,
          expected_delivery: req.body.expected_delivery,
          instructions: req.body.instructions,
          payment_terms: req.body.payment_terms,
          organization_id: req.body.organization_id
        })
          .then(purchase_orders => res.status(201).json(purchase_orders))
          .catch(error => res.status(400).send(error));
      });
  },

  findAll(req, res) {
    const Users = require("../models").users;
    PurchaseOrders.belongsTo(Users);

    const Status = require("../models").status;
    PurchaseOrders.belongsTo(Status);

    const Locations = require("../models").locations;
    PurchaseOrders.belongsTo(Locations);
    Users.belongsTo(Locations);

    const PurchaseOrderItems = require("../models").purchase_order_items
    PurchaseOrders.hasMany(PurchaseOrderItems);

    const Units = require("../models").units
    PurchaseOrderItems.belongsTo(Units);

    if (req.params.id === "1") {
      const Organizations = require("../models").organizations;
      PurchaseOrders.belongsTo(Organizations);

      PurchaseOrders.findAndCountAll({
        include: [
          {
            model: Organizations,
            attributes: ["code"]
          },
          {
            model: PurchaseOrderItems,
            attributes: [
              'id',
              'description',
              'quantity',
              'unit_price',
              'total_amount'
            ],
            include: {
              model: Units,
              attributes: [
                'name'
              ]
            }
          },
          {
            model: Users,
            attributes: ["full_name", "department_id", "id"],
            include: [
              {
                model: Locations,
                attributes: ["name"]
              }
            ]
          },
          {
            model: Status,
            attributes: ["name"]
          },
          {
            model: Locations,
            attributes: ["name"]
          }
        ],
        order: [["organization_id", "ASC"], ["number", "DESC"]],
        attributes: [
          "id",
          "number",
          "instructions",
          "payment_terms",
          "vendor_id",
          "location_id",
          "organization_id",
          "status_id",
          "workflow_status",
          "workflow_id",
          "total_amount",
          [
            sequelize.fn(
              constants.DATE_FORMAT_FUNCTION,
              sequelize.col("purchase_orders.date"),
              constants.SHORT_DATE_FORMAT_PARAMS
            ),
            "date"
          ],
          [
            sequelize.fn(
              constants.DATE_FORMAT_FUNCTION,
              sequelize.col("purchase_orders.date"),
              constants.DEFAULT_DATE_FORMAT_PARAMS
            ),
            "_date"
          ],
          [
            sequelize.fn(
              constants.DATE_FORMAT_FUNCTION,
              sequelize.col("purchase_orders.expected_delivery"),
              constants.SHORT_DATE_FORMAT_PARAMS
            ),
            "expected_delivery"
          ],
          [
            sequelize.fn(
              constants.DATE_FORMAT_FUNCTION,
              sequelize.col("purchase_orders.expected_delivery"),
              constants.DEFAULT_DATE_FORMAT_PARAMS
            ),
            "_expected_delivery"
          ],
          [
            sequelize.fn(
              constants.DATE_FORMAT_FUNCTION,
              sequelize.col("purchase_orders.created_at"),
              constants.DATE_FORMAT_PARAMS
            ),
            "created_at"
          ],
          [
            sequelize.fn(
              constants.DATE_FORMAT_FUNCTION,
              sequelize.col("purchase_orders.updated_at"),
              constants.DATE_FORMAT_PARAMS
            ),
            "updated_at"
          ]
        ]
      })
        .then(purchase_orders => res.json(purchase_orders))
        .catch(error => res.status(400).send(error));
    } else {
      PurchaseOrders.findAndCountAll({
        where: {
          organization_id: req.params.id
        },
        include: [
          {
            model: PurchaseOrderItems,
            attributes: [
              'id',
              'description',
              'quantity',
              'unit_price',
              'total_amount'
            ],
            include: {
              model: Units,
              attributes: [
                'name'
              ]
            }
          },
          {
            model: Users,
            attributes: ["full_name", "department_id"],
            include: [
              {
                model: Locations,
                attributes: ["name"]
              }
            ]
          },
          {
            model: Status,
            attributes: ["name"]
          },
          {
            model: Locations,
            attributes: ["name"]
          }
        ],
        order: [["number", "DESC"]],
        attributes: [
          "id",
          "number",
          "instructions",
          "payment_terms",
          "vendor_id",
          "location_id",
          "organization_id",
          "status_id",
          "workflow_status",
          "workflow_id",
          "total_amount",
          [
            sequelize.fn(
              constants.DATE_FORMAT_FUNCTION,
              sequelize.col("purchase_orders.date"),
              constants.SHORT_DATE_FORMAT_PARAMS
            ),
            "date"
          ],
          [
            sequelize.fn(
              constants.DATE_FORMAT_FUNCTION,
              sequelize.col("purchase_orders.date"),
              constants.DEFAULT_DATE_FORMAT_PARAMS
            ),
            "_date"
          ],
          [
            sequelize.fn(
              constants.DATE_FORMAT_FUNCTION,
              sequelize.col("purchase_orders.expected_delivery"),
              constants.SHORT_DATE_FORMAT_PARAMS
            ),
            "expected_delivery"
          ],
          [
            sequelize.fn(
              constants.DATE_FORMAT_FUNCTION,
              sequelize.col("purchase_orders.expected_delivery"),
              constants.DEFAULT_DATE_FORMAT_PARAMS
            ),
            "_expected_delivery"
          ],
          [
            sequelize.fn(
              constants.DATE_FORMAT_FUNCTION,
              sequelize.col("purchase_orders.created_at"),
              constants.DATE_FORMAT_PARAMS
            ),
            "created_at"
          ],
          [
            sequelize.fn(
              constants.DATE_FORMAT_FUNCTION,
              sequelize.col("purchase_orders.updated_at"),
              constants.DATE_FORMAT_PARAMS
            ),
            "updated_at"
          ]
        ]
      })
        .then(purchase_orders => res.json(purchase_orders))
        .catch(error => res.status(400).send(error));
    }
  },
  delete(req, res) {
    return PurchaseOrders.findOne({
      where: {
        id: req.params.id
      }
    })
      .then(purchase_orders =>
        purchase_orders
          .update({
            status_id:
              purchase_orders.status_id === constants.activeValue
                ? constants.inActiveValue
                : constants.activeValue
          })
          .then(() => {
            res.json({ status: true });
          })
      )
      .catch(error => res.status(400).send(error));
  },

  update(req, res) {
    return PurchaseOrders.findOne({
      where: {
        id: req.params.id
      }
    })
      .then(purchase_orders =>
        purchase_orders
          .update({
            user_id: req.body.user_id,
            number: req.body.number,
            vendor_id: req.body.vendor_id,
            date: req.body.date,
            location_id: req.body.location_id,
            expected_delivery: req.body.expected_delivery,
            instructions: req.body.instructions,
            payment_terms: req.body.payment_terms,
            organization_id: req.body.organization_id
          })
          .then(result => {
            res.json(result);
          })
      )
      .catch(error => res.status(400).send(error));
  }
};
