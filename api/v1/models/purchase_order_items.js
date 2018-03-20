"use strict";
module.exports = function (sequelize, DataTypes) {
  const PurchaseOrderItems = sequelize.define("purchase_order_items", {
    purchase_order_id: {
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
    },
    unit_cost: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    total_amount: {
      type: DataTypes.DOUBLE,
      allowNull: false
    }
  });

  return PurchaseOrderItems;
};
