"use strict";
const UsersPermissions = require("../models").users_permissions;
const sequelize = require("sequelize");
const constants = require("../lib/constants");

module.exports = {
  create(req, res) {
    return UsersPermissions.create({
      user_id: req.body.user_id,
      permission_id: req.body.permission_id
    })
      .then(users_permissions =>
        res.status(201).send(users_permissions)
      )
      .catch(error => res.status(400).send(error));
  },

  findByUserId(req, res) {
    return UsersPermissions.findAndCountAll({
      raw: true,
      where: {
        user_id: req.params.id
      },
      attributes: ["id", "user_id", "permission_id"]
    })
      .then(users_permissions => res.json(users_permissions))
      .catch(error => res.status(400).json(error));
  },
  delete(req, res) {
    return UsersPermissions.findOne({
      where: {
        id: req.params.id
      }
    })
      .then(users_permissions =>
        users_permissions.destroy().then(() => {
          res.json({ status: true });
        })
      )
      .catch(error => res.status(400).send(error));
  }
};
