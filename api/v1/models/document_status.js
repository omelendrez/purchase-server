"use strict";
module.exports = function (sequelize, DataTypes) {
  const DocumentStatus = sequelize.define("document_status", {
    document_type: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    document_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    document_status: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    remarks: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  return DocumentStatus;
};
