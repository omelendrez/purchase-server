"use strict";
module.exports = function (sequelize, DataTypes) {
  const Permissions = sequelize.define("permissions", {
    code: {
      type: DataTypes.STRING,
      allowNull: false
    },
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
    }
  });

  return Permissions;
};
