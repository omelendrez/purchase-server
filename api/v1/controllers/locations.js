"use strict";
const Locations = require("../models").locations;
const sequelize = require("sequelize");

module.exports = {
  create(req, res) {
    const name = req.body.name.charAt(0).toUpperCase() + req.body.name.slice(1);

    return Locations
      .create({
        name: name,
        address: req.body.address,
        phone: req.body.phone
      })
      .then(locations => res.status(201).json(locations))
      .catch(error => res.status(400).json(error));
  },

  findAll(req, res) {
    const Status = require("../models").status;
    Locations.belongsTo(Status);
    return Locations
      .findAndCountAll({
        raw: true,
        include: [{
          model: Status,
          attributes: [
            'name'
          ]
        }],
        attributes: [
          'id',
          'name',
          'address',
          'phone',
          'status_id',
          [sequelize.fn('to_char', sequelize.col('locations.created_at'), 'DD-MM-YY'), 'created_at'],
          [sequelize.fn('to_char', sequelize.col('locations.updated_at'), 'DD-MM-YY'), 'updated_at']
        ]
      })
      .then(locations => res.json(locations))
      .catch(error => res.status(400).send(error));
  },
  delete(req, res) {
    return Locations
      .findOne({
        where: {
          id: req.params.id
        }
      })
      .then(locations => locations.update({
        status_id: locations.status_id === 1 ? 2 : 1
      })
        .then(result => {
          res.json(result);
        }))
      .catch(error => res.status(400).send(error));
  },

  update(req, res) {
    const name = req.body.name.charAt(0).toUpperCase() + req.body.name.slice(1);
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
          phone: req.body.phone
        })
        .then(result => {
          res.json(result);
        }))
      .catch(error => res.status(400).send(error));
  }

};