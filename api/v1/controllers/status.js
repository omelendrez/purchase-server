"use strict";
const Status = require("../models").status;
const sequelize = require("sequelize");
const constants = require("../lib/constants")

module.exports = {
  create(req, res) {
    return Status
      .create({
        name: req.body.name
      })
      .then(status => res.status(201).send(status))
      .catch(error => res.status(400).send(error));
  },

  findAll(req, res) {
    return Status
      .findAndCountAll({
        raw: true,
        attributes: [
          'id',
          'name',
          [sequelize.fn(constants.DATE_FORMAT_FUNCTION, sequelize.col('status.created_at'), constants.DATE_FORMAT_PARAMS), 'created_at'],
          [sequelize.fn(constants.DATE_FORMAT_FUNCTION, sequelize.col('status.updated_at'), constants.DATE_FORMAT_PARAMS), 'updated_at']
        ]


      })
      .then(status => res.json(status))
      .catch(error => res.status(400).json(error));
  }
};