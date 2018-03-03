"use strict";
const Users = require("../models").users;
const sequelize = require("sequelize");
const Op = sequelize.Op
const constants = require("../lib/constants")
const bcrypt = require("bcrypt");

module.exports = {
  create(req, res) {
    Users.findOne({
      where: {
        user_name: req.body.user_name
      }
    })
      .then(users => {
        if (users) {
          res.json({ error: true, message: constants.findMessage("inUse").replace('{user_name}', req.body.user_name) })
        } else {
          const fullName = req.body.full_name.split(" ")
          for (let i = 0; i < fullName.length; i++) {
            fullName[i] = fullName[i].charAt(0).toUpperCase() + fullName[i].slice(1)
          }
          Users
            .create({
              user_name: req.body.user_name,
              full_name: fullName.join(" "),
              location_id: req.body.location_id,
              position_id: req.body.position_id,
              password: req.body.password
            })
            .then(users => res.status(201).json(users))
            .catch(error => res.status(400).send(error));
        }
      })
  },

  findAll(req, res) {
    const Status = require("../models").status;
    Users.belongsTo(Status);
    const Locations = require("../models").locations;
    Users.belongsTo(Locations);
    const Positions = require("../models").positions;
    Users.belongsTo(Positions);

    Users
      .findAndCountAll({
        raw: true,
        include: [{
          model: Status,
          attributes: [
            'name'
          ]
        },
        {
          model: Locations,
          attributes: [
            'name'
          ]
        },
        {
          model: Positions,
          attributes: [
            'name'
          ]
        }],
        attributes: [
          'id',
          'user_name',
          'full_name',
          'status_id',
          'location_id',
          'position_id',
          'password',
          [sequelize.fn(constants.DATE_FORMAT_FUNCTION, sequelize.col('users.created_at'), constants.DATE_FORMAT_PARAMS), 'created_at'],
          [sequelize.fn(constants.DATE_FORMAT_FUNCTION, sequelize.col('users.updated_at'), constants.DATE_FORMAT_PARAMS), 'updated_at']
        ]
      })
      .then(users => res.json(users))
      .catch(error => res.status(400).json(error));
  },

  findById(req, res) {
    const Status = require("../models").status;
    Users.belongsTo(Status);
    const Locations = require("../models").locations;
    Users.belongsTo(Locations);
    const Positions = require("../models").positions;
    Users.belongsTo(Positions);
    Users
      .findOne({
        where: {
          id: req.params.id
        },
        include: [{
          model: Status,
          attributes: [
            'name'
          ]
        },
        {
          model: Locations,
          attributes: [
            'name'
          ]
        },
        {
          model: Positions,
          attributes: [
            'name'
          ]
        }],
        attributes: [
          'id',
          'user_name',
          'full_name',
          'status_id',
          'location_id',
          'position_id',
          [sequelize.fn(constants.DATE_FORMAT_FUNCTION, sequelize.col('users.created_at'), constants.DATE_FORMAT_PARAMS), 'created_at'],
          [sequelize.fn(constants.DATE_FORMAT_FUNCTION, sequelize.col('users.updated_at'), constants.DATE_FORMAT_PARAMS), 'updated_at']
        ]

      })
      .then(users => users ? res.json(users) : res.status(404).json({
        "error": "Not found"
      }))
      .catch(error => res.status(400).send(error));
  },

  login(req, res) {
    return Users
      .findOne({
        where: {
          user_name: req.body.user_name,
          status_id: 1
        },
        attributes: [
          'id',
          'user_name',
          'full_name',
          'status_id',
          'location_id',
          'position_id',
          'password'
        ]
      })
      .then((users) => {
        bcrypt.compare(req.body.password, users.password)
          .then((result) => {
            if (result) {
              res.json(users)
            } else {
              res.json({
                "id": 0
              })
            }
          })
      })
      .catch(error => res.status(400).send(error));
  },

  delete(req, res) {
    return Users
      .findOne({
        where: {
          id: req.params.id
        }
      })
      .then(users => users.update({
        status_id: users.status_id === 1 ? 2 : 1
      })
        .then(() => {
          res.json({ status: true });
        }))
      .catch(error => res.status(400).send(error));
  },

  update(req, res) {

    Users.findOne({
      where: {
        user_name: req.body.user_name,
        id: {
          [Op.ne]: req.body.id
        }
      }
    })
      .then(users => {
        if (users) {
          res.json({ error: true, message: constants.findMessage("inUse") })
        } else {
          const fullName = req.body.full_name.split(" ")
          for (let i = 0; i < fullName.length; i++) {
            fullName[i] = fullName[i].charAt(0).toUpperCase() + fullName[i].slice(1)
          }
          Users
            .findOne({
              where: {
                id: req.params.id
              }
            })
            .then(users => users.update(
              {
                user_name: req.body.user_name,
                full_name: fullName.join(" "),
                location_id: req.body.location_id,
                position_id: req.body.position_id
              })
              .then(result => {
                res.json(result);
              }))
            .catch(error => res.status(400).send(error));
        }
      })
  },

  changePassword(req, res) {
    return Users
      .findOne({
        where: {
          id: req.params.id
        }
      })
      .then((users) => {
        bcrypt.compare(req.body.password, users.password)
          .then((result) => {
            if (result) {
              users.update(
                {
                  password: req.body.password_new
                })
                .then(result => {
                  res.json(result);
                })
                .catch(error => res.json({
                  error: error,
                  msg: "No se pudo cambiar la password"
                }))
            } else {
              res.json({
                error: "wrong password",
                msg: "Password actual no es correcta"
              })
            }
          })
      })
  }

};