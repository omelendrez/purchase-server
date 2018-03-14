"use strict";
const Locations = require("../models").locations;
const sequelize = require("sequelize");
const constants = require("../lib/constants");

module.exports = {
  create(req, res) {
    const name = constants.formatName(req.body.name)
    return Locations
      .create({
        name: name,
        address: req.body.address,
        phone: req.body.phone,
        organization_id: req.body.organization_id
      })
      .then(locations => res.status(201).json(locations))
      .catch(error => res.status(400).json(error));
  },

  findAll(req, res) {
    const Status = require("../models").status;
    Locations.belongsTo(Status);
    const Organizations = require("../models").organizations;
    Locations.belongsTo(Organizations);

    if (req.params.id === "1") {

      Locations
        .findAndCountAll({
          raw: true,
          include: [{
            model: Status,
            attributes: [
              'name'
            ]
          }, {
            model: Organizations,
            attributes: [
              'name'
            ]
          }],
          order: [
            ['organization_id', 'ASC'],
            ['name', 'ASC']
          ],
          attributes: [
            'id',
            'name',
            'address',
            'phone',
            'status_id',
            'organization_id',
            [sequelize.fn(constants.DATE_FORMAT_FUNCTION, sequelize.col('locations.created_at'), constants.DATE_FORMAT_PARAMS), 'created_at'],
            [sequelize.fn(constants.DATE_FORMAT_FUNCTION, sequelize.col('locations.updated_at'), constants.DATE_FORMAT_PARAMS), 'updated_at']
          ]
        })
        .then(locations => res.json(locations))
        .catch(error => res.status(400).send(error));
    } else {
      Locations
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
          }, {
            model: Organizations,
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
            'address',
            'phone',
            'status_id',
            'organization_id',
            [sequelize.fn(constants.DATE_FORMAT_FUNCTION, sequelize.col('locations.created_at'), constants.DATE_FORMAT_PARAMS), 'created_at'],
            [sequelize.fn(constants.DATE_FORMAT_FUNCTION, sequelize.col('locations.updated_at'), constants.DATE_FORMAT_PARAMS), 'updated_at']
          ]
        })
        .then(locations => res.json(locations))
        .catch(error => res.status(400).send(error));

    }
  },
  delete(req, res) {
    return Locations
      .findOne({
        where: {
          id: req.params.id
        }
      })
      .then(locations => locations.update({
        status_id: locations.status_id === constants.activeValue ? constants.inActiveValue : constants.activeValue
      })
        .then(result => {
          res.json(result);
        }))
      .catch(error => res.status(400).send(error));
  },

  update(req, res) {
    const name = constants.formatName(req.body.name)
    return Locations
      .findOne({
        where: {
          id: req.params.id
        }
      })
      .then(locations => locations.update(
        {
          name: name,
          address: req.body.address,
          phone: req.body.phone,
          organization_id: req.body.organization_id
        })
        .then(result => {
          res.json(result);
        }))
      .catch(error => res.status(400).send(error));
  }

};
