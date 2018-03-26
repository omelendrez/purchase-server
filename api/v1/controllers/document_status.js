"use strict";
const DocumentStatus = require("../models").document_status;
const Requisitions = require("../models").requisitions;
const PurchaseOrders = require("../models").purchase_orders;
const sequelize = require("sequelize");
const constants = require("../lib/constants")

module.exports = {
  create(req, res) {
    DocumentStatus
      .create({
        document_type: req.body.document_type,
        document_id: req.body.document_id,
        document_status: req.body.document_status,
        remarks: req.body.remarks,
        user_id: req.body.user_id
      })
      .then(document_status => {
        if (req.body.document_type === 1) {
          Requisitions
            .findOne({
              where: {
                id: req.body.document_id
              }
            })
            .then(requisitions => requisitions.update(
              {
                workflow_status: req.body.document_status,
                status_id: req.body.document_status === 2 ? 2 : 1
              })
              .then(result => {
                res.status(201).send(document_status)
              }))
            .catch(error => res.status(400).send(error));
        } else {
          PurchaseOrders
            .findOne({
              where: {
                id: req.body.document_id
              }
            })
            .then(purchase_orders => purchase_orders.update(
              {
                workflow_status: req.body.document_status,
                status_id: req.body.document_status === 2 ? 2 : 1
              })
              .then(result => {
                res.status(201).send(document_status)
              }))
            .catch(error => res.status(400).send(error));
        }
      })
      .catch(error => res.status(400).send(error));
  },

  findByDocumentId(req, res) {
    const Users = require("../models").users;
    DocumentStatus.belongsTo(Users);
    DocumentStatus
      .findAll({
        raw: true,
        where: {
          document_type: req.params.type,
          document_id: req.params.id
        },
        include: [{
          model: Users,
          attributes: [
            'full_name'
          ]
        }],
        attributes: [
          sequelize.col('document_status'),
          'remarks',
          [sequelize.fn(constants.DATE_FORMAT_FUNCTION, sequelize.col('document_status.created_at'), constants.DATE_FORMAT_PARAMS), 'created_at'],
          [sequelize.fn(constants.DATE_FORMAT_FUNCTION, sequelize.col('document_status.updated_at'), constants.DATE_FORMAT_PARAMS), 'updated_at']
        ]
      })
      .then(document_status => res.json(document_status))
      .catch(error => res.status(400).send(error));
  },
};
