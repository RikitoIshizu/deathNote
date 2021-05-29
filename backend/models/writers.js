'use strict';
// const { Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  const Writers = sequelize.define('Writers', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: '名前を入力してください。'
        }
      }
    },
    mail: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'メールアドレスを入力してください。'
        },
        isEmail: {
          msg: 'メールアドレスが正しく入力されていません。'
        },
      }
    },
    age: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          msg: '年齢を入力してください。'
        },
        isInt: {
          msg: '年齢は数値で入力してください。'
        }
      }
    },
    occupation: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: '職業を入力してください。'
        },
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: '職業を入力してください。'
        },
        len: {
          args: [6, 12],
          msg: 'パスワードは6文字以上12文字以内で入力してください。'
        }
      }
    },
  }, {});

  Writers.associate = models =>
    Writers.hasMany(models.deadPersonList);

  return Writers;
};