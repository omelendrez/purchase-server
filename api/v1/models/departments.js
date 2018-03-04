"use strict";
module.exports = function (sequelize, DataTypes) {
  const Departments = sequelize.define("departments", {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    status_id: {
      type: DataTypes.INTEGER,
      defaultValue: 1
    },
    organization_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  });

  return Departments;
};