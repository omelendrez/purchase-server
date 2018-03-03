"use strict";
const Positions = require("../models").positions;
const sequelize = require("sequelize");

module.exports = {
  create(req, res) {
    const name = req.body.name.charAt(0).toUpperCase() + req.body.name.slice(1);
    return Positions
      .create({
        name: name
      })
      .then(positions => res.status(201).send(positions))
      .catch(error => res.status(400).send(error));
  },

  findAll(req, res) {
    return Positions
      .findAndCountAll({
        raw: true,
        attributes: [
          'id',
          'name',
          [sequelize.fn('to_char', sequelize.col('positions.created_at'), 'DD-MM-YY'), 'created_at'],
          [sequelize.fn('to_char', sequelize.col('positions.updated_at'), 'DD-MM-YY'), 'updated_at']
        ]
      })
      .then(positions => res.json(positions))
      .catch(error => res.status(400).send(error));
  },
  delete(req, res) {
    return Positions
      .findOne({
        where: {
          id: req.params.id
        }
      })
      .then(positions => positions.destroy()
        .then(result => {
          res.json(result);
        }))
      .catch(error => res.status(400).send(error));
  },

  update(req, res) {
    const name = req.body.name.charAt(0).toUpperCase() + req.body.name.slice(1);
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