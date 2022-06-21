module.exports = (sequelize, Sequelize) => { 
    const Campaign = sequelize.define("Campaign", {      
        Description: {
          type: Sequelize.STRING
        }
      }, { 
          schema: 'hr',
          freezeTableName: true,
          timestamps: false
      });
      return Campaign;
  };