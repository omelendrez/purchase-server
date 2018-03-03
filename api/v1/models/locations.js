"use strict";
module.exports = function(sequelize, DataTypes) {
  const Locations = sequelize.define("locations", {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false
    },
    phone: {
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