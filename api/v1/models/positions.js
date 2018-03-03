"use strict";
module.exports = function(sequelize, DataTypes) {
  const Positions = sequelize.define(
    "positions",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false
      }
    }
  );

  return Positions;
};
