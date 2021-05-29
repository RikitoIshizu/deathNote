'use strict';
// const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  const deadPersonList = sequelize.define('deadPersonList', {
    killerId: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: true
      }
    },
    killerName: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true,
      }
    },
    causeOfDeath: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true,
      }
    },
    detail: {
      type: DataTypes.STRING,
    },
    killPersonName: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true,
      }
    }
  }, {});

  deadPersonList.associate = models =>
    deadPersonList.belongsTo(models.Writers);

  return deadPersonList;
};