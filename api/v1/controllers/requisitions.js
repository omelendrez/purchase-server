"use strict";
const Requisitions = require("../models").requisitions;
const sequelize = require("sequelize");
const constants = require("../lib/constants");

module.exports = {
  create(req, res) {
    return Requisitions
      .create({
        user_id: req.body.user_id,
        number: req.body.number,
        date: req.body.date,
        remarks: req.body.remarks,
        location_id: req.body.location_id,
        department_id: req.body.department_id,
        delivery_location_id: req.body.delivery_location_id,
        project_id: req.body.project_id,
        expected_delivery: req.body.expected_delivery,
        organization_id: req.body.organization_id
      })
      .then(requisitions => res.status(201).json(requisitions))
      .catch(error => res.status(400).send(error));
  },

  findAll(req, res) {

    const Users = require("../models").users;
    Requisitions.belongsTo(Users);

    const Status = require("../models").status;
    Requisitions.belongsTo(Status);

    const Locations = require("../models").locations;
    Requisitions.belongsTo(Locations);
    Users.belongsTo(Locations);

    const Departments = require("../models").departments;
    Requisitions.belongsTo(Departments);

    const Projects = require("../models").projects;
    Requisitions.belongsTo(Projects);

    if (req.params.id === "1") {

      const Organizations = require("../models").organizations;
      Requisitions.belongsTo(Organizations);

      Requisitions
        .findAndCountAll({
          raw: true,
          include: [{
            model: Organizations,
            attributes: [
              'name'
            ]
          }, {
            model: Users,
            attributes: [
              'full_name'
            ],
            include: [{
              model: Locations,
              attributes: [
                'name'
              ]
            }]
          }, {
            model: Status,
            attributes: [
              'name'
            ]
          }, {
            model: Locations,
            attributes: [
              'name'
            ]
          }, {
            model: Departments,
            attributes: [
              'name'
            ]
          }, {
            model: Projects,
            attributes: [
              'code',
              'name'
            ]
          }],
          order: [
            ['organization_id', 'ASC'],
            ['number', 'ASC']
          ],
          attributes: [
            'id',
            'number',
            'remarks',
            'status_id',
            [sequelize.fn(constants.DATE_FORMAT_FUNCTION, sequelize.col('requisitions.date'), constants.SHORT_DATE_FORMAT_PARAMS), 'date'],
            [sequelize.fn(constants.DATE_FORMAT_FUNCTION, sequelize.col('requisitions.expected_delivery'), constants.SHORT_DATE_FORMAT_PARAMS), 'expected_delivery'],
            [sequelize.fn(constants.DATE_FORMAT_FUNCTION, sequelize.col('requisitions.created_at'), constants.DATE_FORMAT_PARAMS), 'created_at'],
            [sequelize.fn(constants.DATE_FORMAT_FUNCTION, sequelize.col('requisitions.updated_at'), constants.DATE_FORMAT_PARAMS), 'updated_at']
          ]
        })
        .then(requisitions => res.json(requisitions))
        .catch(error => res.status(400).send(error));
    } else {
      Requisitions
        .findAndCountAll({
          raw: true,
          where: {
            organization_id: req.params.id
          },
          include: [{
            model: Users,
            attributes: [
              'full_name'
            ]
          }, {
            model: Status,
            attributes: [
              'name'
            ]
          }, {
            model: Locations,
            attributes: [
              'name'
            ]
          }, {
            model: Departments,
            attributes: [
              'name'
            ]
          }, {
            model: Projects,
            attributes: [
              'code',
              'name'
            ]
          }],
          order: [
            ['number', 'ASC']
          ],
          attributes: [
            'id',
            'number',
            'status_id',
            [sequelize.fn(constants.DATE_FORMAT_FUNCTION, sequelize.col('requisitions.date'), constants.SHORT_DATE_FORMAT_PARAMS), 'date'],
            [sequelize.fn(constants.DATE_FORMAT_FUNCTION, sequelize.col('requisitions.expected_delivery'), constants.SHORT_DATE_FORMAT_PARAMS), 'expected_delivery'],
            [sequelize.fn(constants.DATE_FORMAT_FUNCTION, sequelize.col('requisitions.created_at'), constants.DATE_FORMAT_PARAMS), 'created_at'],
            [sequelize.fn(constants.DATE_FORMAT_FUNCTION, sequelize.col('requisitions.updated_at'), constants.DATE_FORMAT_PARAMS), 'updated_at']
          ]
        })
        .then(requisitions => res.json(requisitions))
        .catch(error => res.status(400).send(error));

    }
  },
  delete(req, res) {
    return Requisitions
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
    return Requisitions
      .findOne({
        where: {
          id: req.params.id
        }
      })
      .then(requisitions => requisitions.update(
        {
          number: req.body.number,
          date: req.body.date,
          remarks: req.body.remarks,
          location_id: req.body.location_id,
          department_id: req.body.department_id,
          delivery_location_id: req.body.delivery_location_id,
          project_id: req.body.project_id,
          expected_delivery: req.body.expected_delivery,
        })
        .then(result => {
          res.json(result);
        }))
      .catch(error => res.status(400).send(error));
  }

};
