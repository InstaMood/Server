'use strict';
const { hashPassword } = require('../helper/bcrypt')
module.exports = (sequelize, DataTypes) => {
  class Photo extends sequelize.Sequelize.Model {
    static associate (models) {
      Photo.belongsTo(models.User)
    }
  }

  Photo.init({
    link: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args : true,
          msg: "please insert Url"
        }
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "Please insert Description"
        }
      }
    },
    mood: {
      type: DataTypes.STRING
    },
    recommendFood: {
      type:DataTypes.STRING
    },
    UserId: {
      type: DataTypes.INTEGER
    }
  },{sequelize})
  return Photo;
};