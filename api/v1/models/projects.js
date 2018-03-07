"use strict";
module.exports = function (sequelize, DataTypes) {
  const Projects = sequelize.define("projects", {
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
    },
    organization_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  });

  return Projects;
};