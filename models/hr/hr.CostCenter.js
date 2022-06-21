module.exports = (sequelize, Sequelize) => { 
    const CostCenter = sequelize.define("Cost_Center", {
      
        Description: {
          type: Sequelize.STRING
        }
      }, { 
          schema: 'hr',
          freezeTableName: true,
          timestamps: false
      });
      return CostCenter;
  };