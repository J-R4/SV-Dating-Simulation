'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Character extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Character.belongsToMany(models.User, {
        through: models.Relationship
      })
    }

    properCall() {
      if (this.gender === 'woman') {
        return `Ms. ${this.name}`
      } else if (this.gender === 'man') {
        return `Mr. ${this.name}`  
      }
    }

    static likeRespond() {
      return `Do you wanna give this to me ? Thank YOU :)`
    }

    static dislikeRespond() {
      return `Do you wanna give this to me ? @#$$ &^!`
    }
  };
  Character.init({
    name: DataTypes.STRING,
    gender: DataTypes.STRING,
    like: DataTypes.STRING,
    dislike: DataTypes.STRING,
    pic: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Character',
  });
  return Character;
};