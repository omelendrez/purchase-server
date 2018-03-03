"use strict";
const Companies = require("../models").companies;
const sequelize = require("sequelize");
const constants = require("../lib/constants")

module.exports = {

  create(req, res) {
    return Companies
      .create({
        name: req.body.name
      })
      .then(companies => res.status(201).send(companies))
      .catch(error => res.status(400).send(error));
  },

  findAll(req, res) {

    return Companies
      .findAndCountAll({
        attributes: [
          'id',
          'name',
          [sequelize.fn(constants.DATE_FORMAT_FUNCTION, sequelize.col('companies.created_at'), constants.DATE_FORMAT_PARAMS), 'created_at'],
          [sequelize.fn(constants.DATE_FORMAT_FUNCTION, sequelize.col('companies.updated_at'), constants.DATE_FORMAT_PARAMS), 'updated_at']
        ]

      })
      .then(companies => res.json(companies))
      .catch(error => res.status(400).send(error));
  },

  delete(req, res) {
    return Companies
      .findOne({
        where: {
          id: req.params.id
        }
      })
      .then(companies => companies.destroy()
        .then(result => {
          res.json(result);
        }))
      .catch(error => res.status(400).send(error));
  },

  update(req, res) {
    return Companies
      .findOne({
        where: {
          id: req.params.id
        }
      })
      .then(companies => companies.update({
        name: req.body.name
      })
        .then(result => {
          res.json(result);
        }))
      .catch(error => res.status(400).send(error));
  }

};