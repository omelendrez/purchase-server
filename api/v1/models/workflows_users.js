"use strict";
module.exports = function (sequelize, DataTypes) {
  const WorkflowUsers = sequelize.define(
    "workflow_users",
    {
      workflow_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      user_type: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    },
    {
      indexes: [
        {
          unique: true,
          fields: ["workflow_id", "user_id", "user_type"]
        }
      ]
    });

  return WorkflowUsers;
};
