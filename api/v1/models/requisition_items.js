"use strict";
module.exports = function (sequelize, DataTypes) {
  const RequisitionItems = sequelize.define("requisition_items", {
    requisition_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    },
    unit_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  });

  return RequisitionItems;
};
