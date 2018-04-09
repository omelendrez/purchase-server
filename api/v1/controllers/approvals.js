"use strict";
const sequelize = require("sequelize");
const constants = require("../lib/constants");

module.exports = {
  findDocumentById(req, res) {
    if (req.params.type === '1') {
      const Requisitions = require("../models").requisitions

      const RequisitionItems = require("../models").requisition_items
      Requisitions.hasMany(RequisitionItems)

      const Users = require("../models").users;
      Requisitions.belongsTo(Users);

      const Locations = require("../models").locations;
      Requisitions.belongsTo(Locations)
      Users.belongsTo(Locations);

      const Projects = require("../models").projects;
      Requisitions.belongsTo(Projects);

      const Departments = require("../models").departments;
      Requisitions.belongsTo(Departments);

      Requisitions
        .findOne({
          where: {
            id: req.params.id
          },
          include: [
            {
              model: Users,
              attributes: ["full_name"],
              include: [{
                model: Locations,
                attributes: ['name']
              }]
            },
            {
              model: Departments,
              attributes: ['name']
            },
            {
              model: Projects,
              attributes: ['code', 'name']
            },
            {
              model: Locations,
              attributes: ['name']
            },
            {
              model: RequisitionItems,
              attributes: [
                'description',
                'quantity'
              ]
            }],
          attributes: [
            'organization_id',
            'id',
            'user_id',
            'number',
            [sequelize.fn(constants.DATE_FORMAT_FUNCTION, sequelize.col('date'), constants.SHORT_DATE_FORMAT_PARAMS), 'date'],
            'remarks',
            'expected_delivery',
            'workflow_status',
            'workflow_id'
          ]
        })
        .then(requisition => res.json(requisition))
        .catch(error => res.status(400).send(error));
    } else {
      const PurchaseOrders = require("../models").purchase_orders

      const Users = require("../models").users;
      PurchaseOrders.belongsTo(Users);

      const PurchaseOrderItems = require("../models").purchase_order_items
      PurchaseOrders.hasMany(PurchaseOrderItems)

      const Units = require("../models").units
      PurchaseOrderItems.belongsTo(Units);

      const Vendors = require("../models").vendors
      PurchaseOrders.belongsTo(Vendors)

      const Locations = require("../models").locations
      PurchaseOrders.belongsTo(Locations)

      PurchaseOrders
        .findOne({
          where: {
            id: req.params.id
          },
          include: [
            {
              model: Users,
              attributes: ['full_name']
            },
            {
              model: Vendors,
              attributes: ['name']
            },
            {
              model: Locations,
              attributes: ['name']
            },
            {
              model: PurchaseOrderItems,
              attributes: [
                'description',
                'quantity',
                'unit_price',
                'total_amount'
              ],
              include: {
                model: Units,
                attributes: ['name']
              }
            }
          ],
          attributes: [
            'organization_id',
            'id',
            'user_id',
            'number',
            [sequelize.fn(constants.DATE_FORMAT_FUNCTION, sequelize.col('date'), constants.SHORT_DATE_FORMAT_PARAMS), 'date'],
            [sequelize.fn(constants.DATE_FORMAT_FUNCTION, sequelize.col('expected_delivery'), constants.SHORT_DATE_FORMAT_PARAMS), 'expected_delivery'],
            'instructions',
            'payment_terms',
            'workflow_status',
            'workflow_id'
          ]
        })
        .then(purchase_order => res.json(purchase_order))
        .catch(error => res.status(400).send(error));
    }
  }
};
