"use strict";
const Organizations = require("../models").organizations;
const sequelize = require("sequelize");
const constants = require("../lib/constants")

module.exports = {

  create(req, res) {
    const name = constants.formatName(req.body.name)
    return Organizations
      .create({
        code: req.body.code,
        name: name
      })
      .then(organizations => res.status(201).send(organizations))
      .catch(error => {
        constants.catchError(error, req.body.name, res)
      });

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
            ['name', 'ASC']
          ],
          attributes: [
            'id',
            'code',
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
            'code',
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
        status_id: organizations.status_id === constants.activeValue ? constants.inActiveValue : constants.activeValue
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
        code: req.body.code,
        name: name
      })
        .then(result => {
          res.json(result);
        }))
      .catch(error => {
        constants.catchError(error, req.body.name, res)
      });
  }

};
