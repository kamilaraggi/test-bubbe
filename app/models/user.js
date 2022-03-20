const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection.js');

class User extends Model {
   // set up method to run on instance data (per user) to check password
   checkPassword(loginPw) {
    return bcrypt.compareSync(loginPw, this.password);
  }
}


User.init(
  {
    // define columns
   id:{
     type: DataTypes.INTEGER,
     primaryKey:true,
     autoIncrement:true,
     allowNull:false
   },
   firstname:{
     type: DataTypes.STRING,
     allowNull:false
   },
   lastname:{
    type: DataTypes.STRING,
    allowNull:false
   },
   username:{
    type: DataTypes.STRING,
    allowNull:false
   },
   password:{
    type: DataTypes.STRING,
    allowNull:false,
    validate: {
      len: [4]
    }
   },
  
   salt:{
    type: DataTypes.STRING,
    allowNull:false
   },
  },
  {
    hooks: {
      // set up beforeCreate lifecycle "hook" functionality
      async beforeCreate(newUserData) {
        
        return newUserData;
      },

      async beforeUpdate(updatedUserData) {
       
        return updatedUserData;
      }
    },
    
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: 'user',
  }
);

module.exports = User;


