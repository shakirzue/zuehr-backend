module.exports = (sequelize, Sequelize) => { 
    const BusinessUnit = sequelize.define("Business_Unit", {
      
        Description: {
          type: Sequelize.STRING
        }
      }, { 
          schema: 'hr',
          freezeTableName: true,
          timestamps: false
      });
      return BusinessUnit;
  };