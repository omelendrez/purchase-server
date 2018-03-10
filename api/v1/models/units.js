"use strict";
module.exports = function (sequelize, DataTypes) {
  const Units = sequelize.define("units", {
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
        }
      ]
    });

  return Units;
};
