module.exports = (sequelize, Sequelize) => { 
    const Relationship = sequelize.define("Relationship", {      
        Description: {
          type: Sequelize.STRING
        }
      }, { 
          schema: 'hr',
          freezeTableName: true,
          timestamps: false
      });
      return Relationship;
  };