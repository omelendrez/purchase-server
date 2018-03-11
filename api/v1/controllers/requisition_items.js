"use strict";
const RequisitionItems = require("../models").requisition_items;
const sequelize = require("sequelize");
const constants = require("../lib/constants");

module.exports = {
  create(req, res) {
    return RequisitionItems
      .create({
        requisition_id: req.body.requisition_id,
        description: req.body.description,
        unit_id: req.body.unit_id,
        quantity: req.body.quantity
      })
      .then(requisition_items => res.status(201).json(requisition_items))
      .catch(error => res.status(400).send(error));
  },
  findByRequisitionId(req, res) {
    const Units = require("../models").units
    RequisitionItems.belongsTo(Units);

    RequisitionItems
      .findAndCountAll({
        raw: true,
        where: {
          requisition_id: req.params.id
        },
        order: [
          ['id', 'ASC']
        ],
        include: [{
          model: Units,
          attributes: [
            'name'
          ]
        }],
        attributes: [
          'id',
          'description',
          'unit_id',
          'quantity',
          'requisition_id',
          [sequelize.fn(constants.DATE_FORMAT_FUNCTION, sequelize.col('requisition_items.created_at'), constants.DATE_FORMAT_PARAMS), 'created_at'],
          [sequelize.fn(constants.DATE_FORMAT_FUNCTION, sequelize.col('requisition_items.updated_at'), constants.DATE_FORMAT_PARAMS), 'updated_at']
        ]
      })
      .then(requisition_items => res.json(requisition_items))
      .catch(error => res.status(400).send(error));
  },
  delete(req, res) {
    return RequisitionItems
      .findOne({
        where: {
          id: req.params.id
        }
      })
      .then(requisition_items => requisition_items.destroy()
        .then(() => {
          res.json({ status: true });
        }))
      .catch(error => res.status(400).send(error));
  },

  update(req, res) {
    return RequisitionItems
      .findOne({
        where: {
          id: req.params.id
        }
      })
      .then(requisition_items => requisition_items.update(
        {
          description: req.body.description,
          unit_id: req.body.unit_id,
          quantity: req.body.quantity
        })
        .then(result => {
          res.json(result);
        }))
      .catch(error => res.status(400).send(error));
  }

};
