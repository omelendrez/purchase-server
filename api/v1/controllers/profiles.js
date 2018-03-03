"use strict";
const Profiles = require("../models").profiles;
const sequelize = require("sequelize");
const constants = require("../lib/constants")

module.exports = {

  create(req, res) {
    return Profiles
      .create({
        name: req.body.name
      })
      .then(profiles => res.status(201).send(profiles))
      .catch(error => res.status(400).send(error));
  },

  findAll(req, res) {

    return Profiles
      .findAndCountAll({
        attributes: [
          'id',
          'name',
          [sequelize.fn(constants.DATE_FORMAT_FUNCTION, sequelize.col('profiles.created_at'), constants.DATE_FORMAT_PARAMS), 'created_at'],
          [sequelize.fn(constants.DATE_FORMAT_FUNCTION, sequelize.col('profiles.updated_at'), constants.DATE_FORMAT_PARAMS), 'updated_at']
        ]

      })
      .then(profiles => res.json(profiles))
      .catch(error => res.status(400).send(error));
  },

  delete(req, res) {
    return Profiles
      .findOne({
        where: {
          id: req.params.id
        }
      })
      .then(profiles => profiles.destroy()
        .then(result => {
          res.json(result);
        }))
      .catch(error => res.status(400).send(error));
  },

  update(req, res) {
    return Profiles
      .findOne({
        where: {
          id: req.params.id
        }
      })
      .then(profiles => profiles.update({
        name: req.body.name
      })
        .then(result => {
          res.json(result);
        }))
      .catch(error => res.status(400).send(error));
  }

};