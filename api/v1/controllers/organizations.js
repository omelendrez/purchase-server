"use strict";
const Organizations = require("../models").organizations;
const sequelize = require("sequelize");
const constants = require("../lib/constants")

module.exports = {

  create(req, res) {
    return Organizations
      .create({
        name: req.body.name
      })
      .then(organizations => res.status(201).send(organizations))
      .catch(error => res.status(400).send(error));
  },

  findAll(req, res) {
    const Status = require("../models").status;
    Organizations.belongsTo(Status);
    if (req.params.id === "1") {
      Organizations
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
            [sequelize.fn(constants.DATE_FORMAT_FUNCTION, sequelize.col('organizations.created_at'), constants.DATE_FORMAT_PARAMS), 'created_at'],
            [sequelize.fn(constants.DATE_FORMAT_FUNCTION, sequelize.col('organizations.updated_at'), constants.DATE_FORMAT_PARAMS), 'updated_at']
          ]

        })
        .then(organizations => res.json(organizations))
        .catch(error => res.status(400).send(error));

    } else {
      Organizations
        .findAndCountAll({
          raw: true,
          where: {
            id: req.params.id
          },
          include: [{
            model: Status,
            attributes: [
              'name'
            ]
          }],
          order: [
            ['name', 'ASC']
          ],
          attributes: [
            'id',
            'name',
            'status_id',
            [sequelize.fn(constants.DATE_FORMAT_FUNCTION, sequelize.col('organizations.created_at'), constants.DATE_FORMAT_PARAMS), 'created_at'],
            [sequelize.fn(constants.DATE_FORMAT_FUNCTION, sequelize.col('organizations.updated_at'), constants.DATE_FORMAT_PARAMS), 'updated_at']
          ]

        })
        .then(organizations => res.json(organizations))
        .catch(error => res.status(400).send(error));
    }
  },

  delete(req, res) {
    return Organizations
      .findOne({
        where: {
          id: req.params.id
        }
      })
      .then(organizations => organizations.update({
        status_id: organizations.status_id === 1 ? 2 : 1
      })
        .then(() => {
          res.json({ status: true });
        }))
      .catch(error => res.status(400).send(error));
  },

  update(req, res) {
    const name = constants.formatName(req.body.name)

    return Organizations
      .findOne({
        where: {
          id: req.params.id
        }
      })
      .then(organizations => organizations.update({
        name: name
      })
        .then(result => {
          res.json(result);
        }))
      .catch(error => res.status(400).send(error));
  }

};