module.exports = (sequelize, Sequelize) => { 
    
      const NoticePeriodType = sequelize.define("Notice_Period_Type", {      
        Description: {
          type: Sequelize.STRING
        }
      }, { 
          schema: 'hr',
          freezeTableName: true,
          timestamps: false
      });
      return NoticePeriodType;
  };