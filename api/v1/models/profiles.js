"use strict";
module.exports = function(sequelize, DataTypes) {
  const Profiles = sequelize.define("profiles", {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  return Profiles;
};