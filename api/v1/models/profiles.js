"use strict";
module.exports = function (sequelize, DataTypes) {
  const Profiles = sequelize.define(
    "profiles",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      organization_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      status_id: {
        type: DataTypes.INTEGER,
        defaultValue: 1
      }
    });

  return Profiles;
};
