"use strict";
module.exports = function (sequelize, DataTypes) {
  const Departments = sequelize.define("vendors", {
    code: {
      type: DataTypes.STRING,
      allowNull: false
    },
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
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    contact: {
      type: DataTypes.STRING,
      allowNull: false
    },
    remarks: {
      type: DataTypes.TEXT,
      defaultValue: ''
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
