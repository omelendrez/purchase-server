"use strict";
const Vendors = require("../models").vendors;
const sequelize = require("sequelize");
const constants = require("../lib/constants")

module.exports = {

  create(req, res) {
    const name = constants.formatName(req.body.name)
    return Vendors
      .findOne({
        where: {
          name: name,
          organization_id: req.body.organization_id
        }
      })
      .then(vendors => {
        if (vendors) {
          res.json({ error: true, message: constants.findMessage("inUse").replace('{name}', name) })
        } else {
          Vendors.create({
            code: req.body.code,
            name: name,
            address: req.body.address,
            phone: req.body.phone,
            email: req.body.email,
            contact: req.body.contact,
            organization_id: req.body.organization_id
          })
            .then(vendors => res.status(201).send(vendors))
            .catch(error => res.status(400).send(error));
        }
      })
  },

  findAll(req, res) {
    const Status = require("../models").status;
    Vendors.belongsTo(Status);
    const Organizations = require("../models").organizations;
    Vendors.belongsTo(Organizations);

    if (req.params.id === "1") {

      Vendors
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
            'code',
            'name',
            'address',
            'phone',
            'email',
            'contact',
            'status_id',
            'organization_id',
            [sequelize.fn(constants.DATE_FORMAT_FUNCTION, sequelize.col('vendors.created_at'), constants.DATE_FORMAT_PARAMS), 'created_at'],
            [sequelize.fn(constants.DATE_FORMAT_FUNCTION, sequelize.col('vendors.updated_at'), constants.DATE_FORMAT_PARAMS), 'updated_at']
          ]

        })
        .then(vendors => res.json(vendors))
        .catch(error => res.status(400).send(error));
    } else {
      Vendors
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
            'code',
            'name',
            'address',
            'phone',
            'email',
            'contact',
            'status_id',
            'organization_id',
            [sequelize.fn(constants.DATE_FORMAT_FUNCTION, sequelize.col('vendors.created_at'), constants.DATE_FORMAT_PARAMS), 'created_at'],
            [sequelize.fn(constants.DATE_FORMAT_FUNCTION, sequelize.col('vendors.updated_at'), constants.DATE_FORMAT_PARAMS), 'updated_at']
          ]

        })
        .then(vendors => res.json(vendors))
        .catch(error => res.status(400).send(error));

    }
  },

  delete(req, res) {
    return Vendors
      .findOne({
        where: {
          id: req.params.id
        }
      })
      .then(vendors => vendors.update({
        status_id: vendors.status_id === constants.activeValue ? constants.inActiveValue : constants.activeValue
      })
        .then(() => {
          res.json({ status: true });
        }))
      .catch(error => res.status(400).send(error));
  },

  update(req, res) {
    const name = constants.formatName(req.body.name)
    return Vendors
      .findOne({
        where: {
          id: req.params.id
        }
      })
      .then(vendors => vendors.update({
        code: req.body.code,
        name: name,
        address: req.body.address,
        phone: req.body.phone,
        email: req.body.email,
        contact: req.body.contact,
      })
        .then(result => {
          res.json(result);
        }))
      .catch(error => res.status(400).send(error));
  }

};
