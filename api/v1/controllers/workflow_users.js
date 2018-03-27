"use strict";
const WorkflowUsers = require("../models").workflow_users;
const sequelize = require("sequelize");
const constants = require("../lib/constants");

module.exports = {
  create(req, res) {
    return WorkflowUsers
      .create({
        workflow_id: req.body.workflow_id,
        user_id: req.body.user_id,
        user_type: req.body.user_type
      })
      .then(workflow_users => res.status(201).json(workflow_users))
      .catch(error => {
        constants.catchError(error, 'permission', res)
      });
  },

  findByWorkflowId(req, res) {
    return WorkflowUsers
      .findAndCountAll({
        raw: true,
        where: {
          workflow_id: req.params.id
        },
        attributes: [
          'user_id',
          'user_type'
        ]
      })
      .then(workflow_users => res.json(workflow_users))
      .catch(error => res.status(400).send(error))
  },

  findByUserId(req, res) {
    return WorkflowUsers
      .findAndCountAll({
        raw: true,
        where: {
          user_id: req.params.id
        },
        attributes: [
          'workflow_id',
          'user_type'
        ]
      })
      .then(workflow_users => res.json(workflow_users))
      .catch(error => res.status(400).send(error))
  },

  delete(req, res) {
    return WorkflowUsers
      .destroy({
        where: {
          workflow_id: req.params.id,
          user_type: req.params.type
        }
      })
      .then(() => {
        res.json({ success: true });
      })
      .catch(error => res.status(400).send(error));
  }
};
