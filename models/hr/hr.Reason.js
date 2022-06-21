module.exports = (sequelize, Sequelize) => { 

      const Reason = sequelize.define("Reason", {      
        Description: {
          type: Sequelize.STRING
        }
      }, { 
          schema: 'hr',
          freezeTableName: true,
          timestamps: false
      });
      return Reason;
  };