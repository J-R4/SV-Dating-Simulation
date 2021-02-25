'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Relationship extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Relationship.init({
    UserId: DataTypes.INTEGER,
    CharacterId: DataTypes.INTEGER,
    hearts: DataTypes.INTEGER,
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Relationship',
  }),
    Relationship.addHook('beforeCreate', (relationship, options) => {
      if (!relationship.hearts) {
        relationship.hearts = 0
      }
      if (!relationship.status) {
        relationship.status = 'Stranger'
      }
    })
  return Relationship;
};