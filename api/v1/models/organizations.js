"use strict";
module.exports = function (sequelize, DataTypes) {
  const Organizations = sequelize.define("organizations", {
    code: {
      type: DataTypes.STRING,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    status_id: {
      type: DataTypes.INTEGER,
      defaultValue: 1
    }
  },
    {
      indexes: [
        {
          unique: true,
          fields: ["code"]
        },
        {
          unique: true,
          fields: ["name"]
        }
      ]
    });

  return Organizations;
};
