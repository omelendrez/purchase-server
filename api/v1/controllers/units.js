"use strict";
const Units = require("../models").units;
const sequelize = require("sequelize");
const constants = require("../lib/constants");

module.exports = {
  create(req, res) {
    return Units
      .create({
        code: req.body.code.toUpperCase(),
        name: req.body.name
      })
      .then(units => res.status(201).json(units))
      .catch(error => {
        constants.catchError(error, req.body.code, res)
      });

  },

  findAll(req, res) {
    const Status = require("../models").status;
    Units.belongsTo(Status);

    Units
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
          [sequelize.fn(constants.DATE_FORMAT_FUNCTION, sequelize.col('units.created_at'), constants.DATE_FORMAT_PARAMS), 'created_at'],
          [sequelize.fn(constants.DATE_FORMAT_FUNCTION, sequelize.col('units.updated_at'), constants.DATE_FORMAT_PARAMS), 'updated_at']
        ]
      })
      .then(units => res.json(units))
      .catch(error => res.status(400).send(error));
  },
  delete(req, res) {
    return Units
      .findOne({
        where: {
          id: req.params.id
        }
      })
      .then(units => units.update({
        status_id: units.status_id === constants.activeValue ? constants.inActiveValue : constants.activeValue
      })
        .then(result => {
          res.json(result);
        }))
      .catch(error => res.status(400).send(error));
  },

  update(req, res) {
    return Units
      .findOne({
        where: {
          id: req.params.id
        }
      })
      .then(units => units.update(
        {
          code: req.body.code.toUpperCase(),
          name: req.body.name
        })
        .then(result => {
          res.json(result);
        }))
      .catch(error => {
        constants.catchError(error, req.body.code, res)
      });
  }

};
