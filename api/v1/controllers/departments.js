"use strict";
const Departments = require("../models").departments;
const sequelize = require("sequelize");
const constants = require("../lib/constants")

module.exports = {

  create(req, res) {
    const name = constants.formatName(req.body.name)
    return Departments
      .findOne({
        where: {
          name: name,
          organization_id: req.body.organization_id
        }
      })
      .then(departments => {
        if (departments) {
          res.json({ error: true, message: constants.findMessage("inUse").replace('{name}', name) })
        } else {
          Departments.create({
            name: name,
            organization_id: req.body.organization_id
          })
            .then(departments => res.status(201).send(departments))
            .catch(error => res.status(400).send(error));
        }
      })
  },

  findAll(req, res) {
    const Status = require("../models").status;
    Departments.belongsTo(Status);

    if (req.params.id === "1") {

      Departments
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
            [sequelize.fn(constants.DATE_FORMAT_FUNCTION, sequelize.col('departments.created_at'), constants.DATE_FORMAT_PARAMS), 'created_at'],
            [sequelize.fn(constants.DATE_FORMAT_FUNCTION, sequelize.col('departments.updated_at'), constants.DATE_FORMAT_PARAMS), 'updated_at']
          ]

        })
        .then(departments => res.json(departments))
        .catch(error => res.status(400).send(error));
    } else {
      Departments
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
            [sequelize.fn(constants.DATE_FORMAT_FUNCTION, sequelize.col('departments.created_at'), constants.DATE_FORMAT_PARAMS), 'created_at'],
            [sequelize.fn(constants.DATE_FORMAT_FUNCTION, sequelize.col('departments.updated_at'), constants.DATE_FORMAT_PARAMS), 'updated_at']
          ]

        })
        .then(departments => res.json(departments))
        .catch(error => res.status(400).send(error));

    }
  },

  delete(req, res) {
    return Departments
      .findOne({
        where: {
          id: req.params.id
        }
      })
      .then(departments => departments.update({
        status_id: departments.status_id === 1 ? 11 : 1
      })
        .then(() => {
          res.json({ status: true });
        }))
      .catch(error => res.status(400).send(error));
  },

  update(req, res) {
    const name = constants.formatName(req.body.name)
    return Departments
      .findOne({
        where: {
          id: req.params.id
        }
      })
      .then(departments => departments.update({
        name: name
      })
        .then(result => {
          res.json(result);
        }))
      .catch(error => res.status(400).send(error));
  }

};