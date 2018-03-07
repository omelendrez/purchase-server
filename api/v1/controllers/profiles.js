"use strict";
const Profiles = require("../models").profiles;
const sequelize = require("sequelize");
const constants = require("../lib/constants");

module.exports = {
  create(req, res) {
    const name = constants.formatName(req.body.name)
    return Profiles
      .create({
        name: name,
        organization_id: req.body.organization_id
      })
      .then(profiles => res.status(201).send(profiles))
      .catch(error => res.status(400).send(error));
  },

  findAll(req, res) {
    const Status = require("../models").status;
    Profiles.belongsTo(Status);


    Profiles
      .findAndCountAll({
        raw: true,
        include: [{
          model: Status,
          attributes: [
            'name'
          ]
        }],
        order: [
          ['status_id', 'ASC'],
          ['name', 'ASC']
        ],
        attributes: [
          'id',
          'name',
          'status_id',
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
      .then(departments => departments.update({
        status_id: departments.status_id === constants.activeValue ? constants.inActiveValue : constants.activeValue
      })
        .then(() => {
          res.json({ status: true });
        }))
      .catch(error => res.status(400).send(error));
  },

  update(req, res) {
    const name = constants.formatName(req.body.name)
    return Profiles
      .findOne({
        where: {
          id: req.params.id
        }
      })
      .then(profiles => profiles.update(
        {
          name: name
        })
        .then(result => {
          res.json(result);
        }))
      .catch(error => res.status(400).send(error));
  }

};