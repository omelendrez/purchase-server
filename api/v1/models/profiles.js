"use strict";
module.exports = function (sequelize, DataTypes) {
  const Profiles = sequelize.define("profiles", {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
    {
      indexes: [
        {
          unique: true,
          fields: ["name"]
        }
      ]
    });

  return Profiles;
};