"use strict";
const Permissions = require("../models").permissions;
const sequelize = require("sequelize");
const constants = require("../lib/constants")

module.exports = {

  create(req, res) {
    const name = constants.formatName(req.body.name)
    return Permissions
      .findOne({
        where: {
          code: req.body.code
        }
      })
      .then(permissions => {
        if (permissions) {
          res.json({ error: true, message: constants.findMessage("inUse").replace('{name}', name) })
        } else {
          Permissions.create({
            code: req.body.code,
            name: name,
            description: req.body.description
          })
            .then(permissions => res.status(201).send(permissions))
            .catch(error => res.status(400).send(error));
        }
      })
  },

  findAll(req, res) {
    const Status = require("../models").status;
    Permissions.belongsTo(Status);

    Permissions
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
          'code',
          'name',
          'description',
          'status_id',
          [sequelize.fn(constants.DATE_FORMAT_FUNCTION, sequelize.col('permissions.created_at'), constants.DATE_FORMAT_PARAMS), 'created_at'],
          [sequelize.fn(constants.DATE_FORMAT_FUNCTION, sequelize.col('permissions.updated_at'), constants.DATE_FORMAT_PARAMS), 'updated_at']
        ]

      })
      .then(permissions => res.json(permissions))
      .catch(error => res.status(400).send(error));
  },

  delete(req, res) {
    return Permissions
      .findOne({
        where: {
          id: req.params.id
        }
      })
      .then(permissions => permissions.update({
        status_id: permissions.status_id === constants.activeValue ? constants.inActiveValue : constants.activeValue
      })
        .then(() => {
          res.json({ status: true });
        }))
      .catch(error => res.status(400).send(error));
  },

  update(req, res) {
    const name = constants.formatName(req.body.name)
    return Permissions
      .findOne({
        where: {
          id: req.params.id
        }
      })
      .then(permissions => permissions.update({
        code: req.body.code,
        name: name,
        description: req.body.description
      })
        .then(result => {
          res.json(result);
        }))
      .catch(error => res.status(400).send(error));
  }

};
