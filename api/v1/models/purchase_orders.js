"use strict";
module.exports = function (sequelize, DataTypes) {
  const PurchaseOrders = sequelize.define("purchase_orders", {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    number: {
      type: DataTypes.STRING,
      allowNull: false
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    location_id: {
      type: DataTypes.INTEGER,
      defaultValue: 1
    },
    expected_delivery: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    instructions: {
      type: DataTypes.STRING,
      allowNull: false
    },
    payment_terms: {
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

  return PurchaseOrders;
};
