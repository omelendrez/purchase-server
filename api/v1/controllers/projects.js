"use strict";
const Projects = require("../models").projects;
const sequelize = require("sequelize");
const constants = require("../lib/constants");

module.exports = {
  create(req, res) {
    const name = constants.formatName(req.body.name);
    return Projects.findOne({
      where: {
        name: name,
        organization_id: req.body.organization_id
      }
    }).then(projects => {
      if (projects) {
        res.json({
          error: true,
          message: constants.findMessage("inUse").replace("{name}", name)
        });
      } else {
        Projects.create({
          code: req.body.code.toUpperCase(),
          name: name,
          organization_id: req.body.organization_id
        })
          .then(projects => res.status(201).send(projects))
          .catch(error => res.status(400).send(error));
      }
    });
  },

  findAll(req, res) {
    const Status = require("../models").status;
    Projects.belongsTo(Status);

    if (req.params.id === "1") {
      const Organizations = require("../models").organizations;
      Projects.belongsTo(Organizations);

      Projects.findAndCountAll({
        raw: true,
        include: [
          {
            model: Status,
            attributes: ["name"]
          },
          {
            model: Organizations,
            attributes: ["name"]
          }
        ],
        order: [
          ["organization_id", "ASC"],
          ["name", "ASC"]
        ],
        attributes: [
          "id",
          "code",
          "name",
          "status_id",
          "organization_id",
          [
            sequelize.fn(
              constants.DATE_FORMAT_FUNCTION,
              sequelize.col("projects.created_at"),
              constants.DATE_FORMAT_PARAMS
            ),
            "created_at"
          ],
          [
            sequelize.fn(
              constants.DATE_FORMAT_FUNCTION,
              sequelize.col("projects.updated_at"),
              constants.DATE_FORMAT_PARAMS
            ),
            "updated_at"
          ]
        ]
      })
        .then(projects => res.json(projects))
        .catch(error => res.status(400).send(error));
    } else {
      Projects.findAndCountAll({
        raw: true,
        where: {
          organization_id: req.params.id
        },
        include: [
          {
            model: Status,
            attributes: ["name"]
          }
        ],
        order: [
          ["name", "ASC"]
        ],
        attributes: [
          "id",
          "code",
          "name",
          "status_id",
          "organization_id",
          [
            sequelize.fn(
              constants.DATE_FORMAT_FUNCTION,
              sequelize.col("projects.created_at"),
              constants.DATE_FORMAT_PARAMS
            ),
            "created_at"
          ],
          [
            sequelize.fn(
              constants.DATE_FORMAT_FUNCTION,
              sequelize.col("projects.updated_at"),
              constants.DATE_FORMAT_PARAMS
            ),
            "updated_at"
          ]
        ]
      })
        .then(projects => res.json(projects))
        .catch(error => res.status(400).send(error));
    }
  },

  delete(req, res) {
    return Projects.findOne({
      where: {
        id: req.params.id
      }
    })
      .then(projects =>
        projects
          .update({
            status_id:
              projects.status_id === constants.activeValue
                ? constants.inActiveValue
                : constants.activeValue
          })
          .then(() => {
            res.json({ status: true });
          })
      )
      .catch(error => res.status(400).send(error));
  },

  update(req, res) {
    const name = constants.formatName(req.body.name);
    return Projects.findOne({
      where: {
        id: req.params.id
      }
    })
      .then(projects =>
        projects
          .update({
            code: req.body.code.toUpperCase(),
            organization_id: req.body.organization_id,
            name: name
          })
          .then(result => {
            res.json(result);
          })
      )
      .catch(error => res.status(400).send(error));
  }
};
