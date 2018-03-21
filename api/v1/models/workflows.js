"use strict";
module.exports = function (sequelize, DataTypes) {
  const Workflows = sequelize.define(
    "workflows",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false
      },
      status_id: {
        type: DataTypes.INTEGER,
        defaultValue: 1
      },
      organization_id: {
        type: DataTypes.INTEGER,
        llowNull: false
      }
    },
    {
      indexes: [
        {
          unique: true,
          fields: ["organization_id", "name"]
        }
      ]
    });

  return Workflows;
};
