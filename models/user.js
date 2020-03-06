'use strict';
const {hashPassword} = require('../helper/bcrypt')
module.exports = (sequelize, DataTypes) => {
  class User extends sequelize.Sequelize.Model {
    static associate (models) {
      User.hasMany(models.Photo)
    }
  }

  User.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: "Please insert Email"
        },
        isEmail: {
          args: true,
          msg: "please insert Email as usualy"
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "Please insert password"
        },
        len: {
          args: [2],
          msg: 'Please insert Password minimun 2 character'
        }
      }
    }
  },{sequelize,
    hooks: {
      beforeCreate: (user,option) => {
        user.password = hashPassword(user.password)
      }
    }})
  return User;
};