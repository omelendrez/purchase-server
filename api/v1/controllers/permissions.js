"use strict";
const Permissions = require("../models").permissions;
const sequelize = require("sequelize");
const constants = require("../lib/constants")

module.exports = {

  create(req, res) {
    const code = req.body.code.toUpperCase()
    const name = constants.formatName(req.body.name)
    return Permissions
      .findOne({
        where: {
          code: name
        }
      })
      .then(permissions => {
        if (permissions) {
          res.json({ error: true, message: constants.findMessage("inUse").replace('{name}', name) })
        } else {
          Permissions.create({
            code: code,
            name: name,
            description: req.body.description,
            order: req.body.order
          })
            .then(permissions => res.status(201).send(permissions))
            .catch(error => {
              constants.catchError(error, req.body.code, res)
            });
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
          ['order', 'ASC']
        ],
        attributes: [
          'id',
          'code',
          'name',
          'description',
          'order',
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
    const code = req.body.code.toUpperCase()
    const name = constants.formatName(req.body.name)
    return Permissions
      .findOne({
        where: {
          id: req.params.id
        }
      })
      .then(permissions => permissions.update({
        code: code,
        name: name,
        description: req.body.description,
        order: req.body.order
      })
        .then(result => {
          res.json(result);
        }))
      .catch(error => {
        constants.catchError(error, code, res)
      });

  }

};
