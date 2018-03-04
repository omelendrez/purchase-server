"use strict";
const Positions = require("../models").positions;
const sequelize = require("sequelize");
const constants = require("../lib/constants");

module.exports = {
  create(req, res) {
    const name = req.body.name.charAt(0).toUpperCase() + req.body.name.slice(1);
    return Positions
      .create({
        name: name,
        organization_id: req.body.organization_id
      })
      .then(positions => res.status(201).send(positions))
      .catch(error => res.status(400).send(error));
  },

  findAll(req, res) {
    const Status = require("../models").status;
    Positions.belongsTo(Status);

    if (req.params.id === "1") {

      Positions
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
            'organization_id',
            [sequelize.fn(constants.DATE_FORMAT_FUNCTION, sequelize.col('positions.created_at'), constants.DATE_FORMAT_PARAMS), 'created_at'],
            [sequelize.fn(constants.DATE_FORMAT_FUNCTION, sequelize.col('positions.updated_at'), constants.DATE_FORMAT_PARAMS), 'updated_at']
          ]
        })
        .then(positions => res.json(positions))
        .catch(error => res.status(400).send(error));
    } else {
      Positions
        .findAndCountAll({
          raw: true,
          where: {
            organization_id: req.params.id
          },
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
            'organization_id',
            [sequelize.fn(constants.DATE_FORMAT_FUNCTION, sequelize.col('positions.created_at'), constants.DATE_FORMAT_PARAMS), 'created_at'],
            [sequelize.fn(constants.DATE_FORMAT_FUNCTION, sequelize.col('positions.updated_at'), constants.DATE_FORMAT_PARAMS), 'updated_at']
          ]
        })
        .then(positions => res.json(positions))
        .catch(error => res.status(400).send(error));

    }
  },
  delete(req, res) {
    return Positions
      .findOne({
        where: {
          id: req.params.id
        }
      })
      .then(departments => departments.update({
        status_id: departments.status_id === 1 ? 2 : 1
      })
        .then(() => {
          res.json({ status: true });
        }))
      .catch(error => res.status(400).send(error));
  },

  update(req, res) {
    const name = constants.formatName(req.body.name)
    return Positions
      .findOne({
        where: {
          id: req.params.id
        }
      })
      .then(positions => positions.update(
        {
          name: name
        })
        .then(result => {
          res.json(result);
        }))
      .catch(error => res.status(400).send(error));
  }

};