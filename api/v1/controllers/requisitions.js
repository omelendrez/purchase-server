"use strict";
const Requisitions = require("../models").requisitions;
const sequelize = require("sequelize");
const constants = require("../lib/constants");

module.exports = {
  create(req, res) {
    let nextNumber = "PR-000001";
    const db = require("./../lib/db");
    db.sequelize
      .query(
        constants.getNextNumber(
          "PR-",
          "requisitions",
          req.body.organization_id
        ), {
          type: sequelize.QueryTypes.SELECT
        }
      )
      .then(result => {
        nextNumber =
          result[0].number.length === 9 ? result[0].number : nextNumber;

        return Requisitions.create({
          user_id: req.body.user_id,
          number: nextNumber,
          date: req.body.date,
          remarks: req.body.remarks,
          department_id: req.body.department_id,
          location_id: req.body.location_id,
          project_id: req.body.project_id,
          expected_delivery: req.body.expected_delivery,
          organization_id: req.body.organization_id
        })
          .then(requisitions => res.status(201).json(requisitions))
          .catch(error => res.status(400).send(error));
      });
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

    const RequisitionItems = require("../models").requisition_items
    Requisitions.hasMany(RequisitionItems);

    const Units = require("../models").units
    RequisitionItems.belongsTo(Units);

    if (req.params.id === "1") {
      const Organizations = require("../models").organizations;
      Requisitions.belongsTo(Organizations);

      Requisitions.findAndCountAll({
        //raw: true,
        include: [
          {
            model: Organizations,
            attributes: ["name"]
          },
          {
            model: RequisitionItems,
            attributes: [
              'id',
              'description',
              'quantity'
            ],
            include: {
              model: Units,
              attributes: [
                'name'
              ]
            }
          },
          {
            model: Users,
            attributes: ["full_name", "department_id", "id"],
            include: [
              {
                model: Locations,
                attributes: ["name"]
              }
            ]
          },
          {
            model: Status,
            attributes: ["name"]
          },
          {
            model: Locations,
            attributes: ["name"]
          },
          {
            model: Departments,
            attributes: ["name"]
          },
          {
            model: Projects,
            attributes: ["code", "name"]
          }
        ],
        order: [["organization_id", "ASC"], ["number", "DESC"]],
        attributes: [
          "id",
          "number",
          "remarks",
          "project_id",
          "location_id",
          "organization_id",
          "status_id",
          "workflow_status",
          "workflow_id",
          [
            sequelize.fn(
              constants.DATE_FORMAT_FUNCTION,
              sequelize.col("requisitions.date"),
              constants.SHORT_DATE_FORMAT_PARAMS
            ),
            "date"
          ],
          [
            sequelize.fn(
              constants.DATE_FORMAT_FUNCTION,
              sequelize.col("requisitions.date"),
              constants.DEFAULT_DATE_FORMAT_PARAMS
            ),
            "_date"
          ],
          [
            sequelize.fn(
              constants.DATE_FORMAT_FUNCTION,
              sequelize.col("requisitions.expected_delivery"),
              constants.SHORT_DATE_FORMAT_PARAMS
            ),
            "expected_delivery"
          ],
          [
            sequelize.fn(
              constants.DATE_FORMAT_FUNCTION,
              sequelize.col("requisitions.expected_delivery"),
              constants.DEFAULT_DATE_FORMAT_PARAMS
            ),
            "_expected_delivery"
          ],
          [
            sequelize.fn(
              constants.DATE_FORMAT_FUNCTION,
              sequelize.col("requisitions.created_at"),
              constants.DATE_FORMAT_PARAMS
            ),
            "created_at"
          ],
          [
            sequelize.fn(
              constants.DATE_FORMAT_FUNCTION,
              sequelize.col("requisitions.updated_at"),
              constants.DATE_FORMAT_PARAMS
            ),
            "updated_at"
          ]
        ]
      })
        .then(requisitions => res.json(requisitions))
        .catch(error => res.status(400).send(error));
    } else {
      Requisitions.findAndCountAll({
        where: {
          organization_id: req.params.id
        },
        include: [
          {
            model: RequisitionItems,
            attributes: [
              'id',
              'description',
              'quantity'
            ],
            include: {
              model: Units,
              attributes: [
                'name'
              ]
            }
          },
          {
            model: Users,
            attributes: ["full_name", "department_id"],
            include: [
              {
                model: Locations,
                attributes: ["name"]
              }
            ]
          },
          {
            model: Status,
            attributes: ["name"]
          },
          {
            model: Locations,
            attributes: ["name"]
          },
          {
            model: Departments,
            attributes: ["name"]
          },
          {
            model: Projects,
            attributes: ["code", "name"]
          }
        ],
        order: [["number", "DESC"]],
        attributes: [
          "id",
          "number",
          "remarks",
          "project_id",
          "location_id",
          "organization_id",
          "status_id",
          "workflow_status",
          "workflow_id",
          [
            sequelize.fn(
              constants.DATE_FORMAT_FUNCTION,
              sequelize.col("requisitions.date"),
              constants.SHORT_DATE_FORMAT_PARAMS
            ),
            "date"
          ],
          [
            sequelize.fn(
              constants.DATE_FORMAT_FUNCTION,
              sequelize.col("requisitions.date"),
              constants.DEFAULT_DATE_FORMAT_PARAMS
            ),
            "_date"
          ],
          [
            sequelize.fn(
              constants.DATE_FORMAT_FUNCTION,
              sequelize.col("requisitions.expected_delivery"),
              constants.SHORT_DATE_FORMAT_PARAMS
            ),
            "expected_delivery"
          ],
          [
            sequelize.fn(
              constants.DATE_FORMAT_FUNCTION,
              sequelize.col("requisitions.expected_delivery"),
              constants.DEFAULT_DATE_FORMAT_PARAMS
            ),
            "_expected_delivery"
          ],
          [
            sequelize.fn(
              constants.DATE_FORMAT_FUNCTION,
              sequelize.col("requisitions.created_at"),
              constants.DATE_FORMAT_PARAMS
            ),
            "created_at"
          ],
          [
            sequelize.fn(
              constants.DATE_FORMAT_FUNCTION,
              sequelize.col("requisitions.updated_at"),
              constants.DATE_FORMAT_PARAMS
            ),
            "updated_at"
          ]
        ]
      })
        .then(requisitions => res.json(requisitions))
        .catch(error => res.status(400).send(error));
    }
  },

  findItems(req, res) {
    const RequisitionItems = require("../models").requisition_items;
    Requisitions.hasMany(RequisitionItems)

    return Requisitions.findOne({
      where: {
        id: req.params.id
      },
      include: {
        model: RequisitionItems,
        attributes: [
          'id',
          'description',
          'unit_id',
          'quantity'
        ],
        required: true
      },
      attributes: [
        'expected_delivery',
        'location_id'
      ]
    })
      .then(requisition => res.json(requisition))
      .catch(error => res.status(400).send(error));

  },

  delete(req, res) {
    return Requisitions.findOne({
      where: {
        id: req.params.id
      }
    })
      .then(departments =>
        departments
          .update({
            status_id:
              departments.status_id === constants.activeValue
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
    return Requisitions.findOne({
      where: {
        id: req.params.id
      }
    })
      .then(requisitions =>
        requisitions
          .update({
            number: req.body.number,
            date: req.body.date,
            remarks: req.body.remarks,
            department_id: req.body.department_id,
            location_id: req.body.location_id,
            project_id: req.body.project_id,
            expected_delivery: req.body.expected_delivery
          })
          .then(result => {
            res.json(result);
          })
      )
      .catch(error => res.status(400).send(error));
  }
};
