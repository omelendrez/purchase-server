"use strict";
const Workflows = require("../models").workflows;
const sequelize = require("sequelize");
const constants = require("../lib/constants");

module.exports = {
  create(req, res) {
    return Workflows
      .create({
        name: req.body.name,
        description: req.body.description
      })
      .then(workflows => res.status(201).json(workflows))
      .catch(error => {
        constants.catchError(error, req.body.name, res)
      });

  },

  findAll(req, res) {
    const Status = require("../models").status;
    Workflows.belongsTo(Status);

    Workflows
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
          'name',
          'description',
          'status_id',
          [sequelize.fn(constants.DATE_FORMAT_FUNCTION, sequelize.col('workflows.created_at'), constants.DATE_FORMAT_PARAMS), 'created_at'],
          [sequelize.fn(constants.DATE_FORMAT_FUNCTION, sequelize.col('workflows.updated_at'), constants.DATE_FORMAT_PARAMS), 'updated_at']
        ]
      })
      .then(workflows => res.json(workflows))
      .catch(error => res.status(400).send(error));
  },
  delete(req, res) {
    return Workflows
      .findOne({
        where: {
          id: req.params.id
        }
      })
      .then(workflows => workflows.update({
        status_id: workflows.status_id === constants.activeValue ? constants.inActiveValue : constants.activeValue
      })
        .then(result => {
          res.json(result);
        }))
      .catch(error => res.status(400).send(error));
  },

  update(req, res) {
    return Workflows
      .findOne({
        where: {
          id: req.params.id
        }
      })
      .then(workflows => workflows.update(
        {
          name: req.body.name,
          description: req.body.description
        })
        .then(result => {
          res.json(result);
        }))
      .catch(error => {
        constants.catchError(error, req.body.name, res)
      });
  }

};
