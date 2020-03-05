'use strict';
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
    mood: {
      type: DataTypes.STRING
    },
    recommendFood: {
      type:DataTypes.STRING
    },
    UserId: {
      type: DataTypes.INTEGER
    }
  })
  return Photo;
};