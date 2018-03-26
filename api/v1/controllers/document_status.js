"use strict";
const DocumentStatus = require("../models").document_status;
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
      .then(document_status => res.status(201).send(document_status))
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
