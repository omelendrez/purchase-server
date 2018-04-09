"use strict";

module.exports = {
  findDocumentById(req, res) {
    if (req.params.type === '1') {
      const Requisitions = require("../models").requisitions
      const Departments = require("../models").departments;
      const Users = require("../models").users;
      const Projects = require("../models").projects;
      const Locations = require("../models").locations;
      const RequisitionItems = require("../models").requisition_items
      const Units = require("../models").units

      Requisitions.belongsTo(Locations)
      Requisitions.belongsTo(Departments);
      Requisitions.belongsTo(Users);
      Users.belongsTo(Locations);
      Requisitions.belongsTo(Projects);
      Requisitions.hasMany(RequisitionItems)
      RequisitionItems.belongsTo(Units)

      Requisitions
        .findOne({
          where: {
            id: req.params.id
          },
          include: [
            {
              model: Users,
              attributes: ['full_name'],
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
              ],
              include: {
                model: Units,
                attributes: ['name']
              }
            }],
          attributes: [
            'organization_id',
            'id',
            'user_id',
            'number',
            'date',
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
      const Vendors = require("../models").vendors
      const Locations = require("../models").locations
      const Users = require("../models").users;
      const PurchaseOrderItems = require("../models").purchase_order_items
      const Units = require("../models").units

      PurchaseOrders.belongsTo(Users);
      PurchaseOrders.belongsTo(Vendors)
      PurchaseOrders.belongsTo(Locations)
      PurchaseOrders.hasMany(PurchaseOrderItems)
      PurchaseOrderItems.belongsTo(Units);

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
            'date',
            'expected_delivery',
            'instructions',
            'payment_terms',
            'workflow_status',
            'workflow_id',
            'total_amount'
          ]
        })
        .then(purchase_order => {
          res.json(purchase_order)
        })
        .catch(error => res.status(400).send(error));
    }
  }
};
