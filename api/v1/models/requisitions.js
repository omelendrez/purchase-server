"use strict";
module.exports = function (sequelize, DataTypes) {
  const Requisitions = sequelize.define("requisitions", {
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
    remarks: {
      type: DataTypes.STRING,
      allowNull: false
    },
    location_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    department_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    project_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    expected_delivery: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    status_id: {
      type: DataTypes.INTEGER,
      defaultValue: 1
    },
    organization_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    workflow_status: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    workflow_id: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    }
  });

  Requisitions.beforeCreate((requisition) => {
    sequelize.query("select concat('PR-',to_char(cast(max(replace(number, 'PR-', '')) as int)+1, '000000')) as number from requisitions", { type: sequelize.QueryTypes.SELECT })
      .then(results => {
        requisition.number = results.number ? results.number : 'PR-000001'
      })
      .catch((err) => {
        requisition.number = 'PR-000001'
      });
  });

  return Requisitions;
};
