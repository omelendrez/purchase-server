"use strict";
module.exports = function(sequelize, DataTypes) {
  const Locations = sequelize.define("companies", {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    status_id: {
      type: DataTypes.INTEGER,
      defaultValue: 1
    }
  });

  return Locations;
};