"use strict";
const Users = require("../models").users;
const sequelize = require("sequelize");
const constants = require("../lib/constants")
const bcrypt = require("bcrypt");

module.exports = {
  create(req, res) {
    const fullName = req.body.full_name.split(" ")
    for (let i = 0; i < fullName.length; i++) {
      fullName[i] = fullName[i].charAt(0).toUpperCase() + fullName[i].slice(1)
    }
    Users
      .create({
        user_name: req.body.user_name.toLowerCase(),
        full_name: fullName.join(" "),
        email: req.body.email,
        organization_id: req.body.organization_id,
        location_id: req.body.location_id,
        department_id: req.body.department_id,
        profile_id: req.body.profile_id,
        password: constants.DEFAULT_PASSWORD
      })
      .then(users => res.status(201).json(users))
      .catch(error => {
        constants.catchError(error, req.body.user_name, res)
      });
  },

  findAll(req, res) {
    const Status = require("../models").status;
    Users.belongsTo(Status);

    const Organizations = require("../models").organizations;
    Users.belongsTo(Organizations);

    const Locations = require("../models").locations;
    Users.belongsTo(Locations);

    const Departments = require("../models").departments;
    Users.belongsTo(Departments);

    const Profiles = require("../models").profiles;
    Users.belongsTo(Profiles);

    const UsersPermissions = require("../models").users_permissions;
    Users.hasMany(UsersPermissions);

    const Permissions = require("../models").permissions;
    UsersPermissions.belongsTo(Permissions);

    if (req.params.id === "1") {

      Users
        .findAndCountAll({
          include: [{
            model: Status,
            attributes: [
              'name'
            ]
          },
          {
            model: UsersPermissions,
            required: false,
            attributes: [
              'permission_id'
            ],
            include: [{
              model: Permissions,
              attributes: [
                'code'
              ]
            }]
          },
          {
            model: Organizations,
            attributes: [
              'code'
            ]
          },
          {
            model: Locations,
            attributes: [
              'name'
            ]
          },
          {
            model: Departments,
            attributes: [
              'name'
            ]
          },
          {
            model: Profiles,
            attributes: [
              'name'
            ]
          }],
          order: [
            ['organization_id', 'ASC'],
            ['full_name', 'ASC']
          ],
          attributes: [
            'id',
            'user_name',
            'full_name',
            'email',
            'status_id',
            'organization_id',
            'location_id',
            'department_id',
            'profile_id',
            [sequelize.fn(constants.DATE_FORMAT_FUNCTION, sequelize.col('users.created_at'), constants.DATE_FORMAT_PARAMS), 'created_at'],
            [sequelize.fn(constants.DATE_FORMAT_FUNCTION, sequelize.col('users.updated_at'), constants.DATE_FORMAT_PARAMS), 'updated_at']
          ]
        })
        .then(users => res.json(users))
        .catch(error => res.status(400).json(error));

    } else {

      Users
        .findAndCountAll({
          where: {
            organization_id: req.params.id
          },
          raw: true,
          include: [{
            model: Status,
            attributes: [
              'name'
            ]
          }, {
            model: UsersPermissions,
            required: false,
            attributes: [
              'permission_id'
            ],
            include: [{
              model: Permissions,
              attributes: [
                'code'
              ]
            }]
          },
          {
            model: Organizations,
            attributes: [
              'code'
            ]
          },
          {
            model: Locations,
            attributes: [
              'name'
            ]
          },
          {
            model: Departments,
            attributes: [
              'name'
            ]
          },
          {
            model: Profiles,
            attributes: [
              'name'
            ]
          }],
          order: [
            ['full_name', 'ASC']
          ],
          attributes: [
            'id',
            'user_name',
            'full_name',
            'email',
            'status_id',
            'organization_id',
            'location_id',
            'department_id',
            'profile_id',
            [sequelize.fn(constants.DATE_FORMAT_FUNCTION, sequelize.col('users.created_at'), constants.DATE_FORMAT_PARAMS), 'created_at'],
            [sequelize.fn(constants.DATE_FORMAT_FUNCTION, sequelize.col('users.updated_at'), constants.DATE_FORMAT_PARAMS), 'updated_at']
          ]
        })
        .then(users => res.json(users))
        .catch(error => res.status(400).json(error));

    }
  },

  login(req, res) {
    const UsersPermissions = require("../models").users_permissions;
    Users.hasMany(UsersPermissions);
    const Permissions = require("../models").permissions;
    UsersPermissions.belongsTo(Permissions);

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
          'email',
          'organization_id',
          'location_id',
          'profile_id',
          'password'
        ],
        include: [{
          model: UsersPermissions,
          required: false,
          attributes: [
            'permission_id'
          ],
          include: [{
            model: Permissions,
            attributes: [
              'code'
            ]
          }]
        }]
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
          }).catch(error => res.json({ error: error, message: 'bcrypt error' }))
      })
      .catch(() => res.json({
        "id": 0
      })
      );
  },

  delete(req, res) {
    return Users
      .findOne({
        where: {
          id: req.params.id
        }
      })
      .then(users => users.update({
        status_id: users.status_id === constants.activeValue ? constants.inActiveValue : constants.activeValue
      })
        .then(() => {
          res.json({ status: true });
        }))
      .catch(error => res.status(400).send(error));
  },

  update(req, res) {

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
          user_name: req.body.user_name.toLowerCase(),
          full_name: fullName.join(" "),
          email: req.body.email,
          location_id: req.body.location_id,
          department_id: req.body.department_id,
          profile_id: req.body.profile_id,
          organization_id: req.body.organization_id
        })
        .then(result => {
          res.json(result);
        })
        .catch(error => {
          constants.catchError(error, req.body.user_name, res)
        }))
      .catch(error => res.status(400).send(error));
  },

  changePassword(req, res) {
    Users
      .findOne({
        where: {
          id: req.params.id
        }
      })
      .then((users) => {
        bcrypt.compare(req.body.password_current, users.password)
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
                  msg: "The password could not be changed"
                }))
            } else {
              res.json({
                error: "wrong password",
                msg: "Current password is incorrect"
              })
            }
          })
          .catch(error => res.json({ error: error, msg: "bcrypt error" }))
      })
  },

  resetPassword(req, res) {
    Users
      .findOne({
        where: {
          id: req.params.id
        }
      })
      .then((users) => {
        users.update(
          {
            password: req.body.password || constants.DEFAULT_PASSWORD
          })
          .then(result => {
            res.json(result);
          })
          .catch(error => res.json({
            error: error,
            msg: "The password could not be reset"
          }))
      })
      .catch(error => res.json({ error: error, msg: "bcrypt error" }))
  }
};
