module.exports = function(sequelize, DataTypes) {
    var User_Like = sequelize.define("User_Like");
     
   
    User_Like.associate = function(models) {
      // We're saying that a User_like should belong to an USER
      // A User_Like can't be created without an USER due to the foreign key constraint
      User_Like.belongsTo(models.Users, {
        foreignKey: {
          allowNull: false
        }
      });
    
  
    return User_Like;
    
  };

    User_Like.associate = function(models) {
    // We're saying that a User_Like should belong to an Recipes
    // A User_Like can't be created without an Recipe due to the foreign key constraint
    User_Like.belongsTo(models.Recipes, {
      foreignKey: {
        allowNull: false
      }
    });
  

  return User_Like;
};
  

}