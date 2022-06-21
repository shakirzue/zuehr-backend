module.exports = (sequelize, Sequelize) => { 

      const RequestStatus = sequelize.define("Request_Status", {      
        Description: {
          type: Sequelize.STRING
        }
      }, { 
          schema: 'hr',
          freezeTableName: true,
          timestamps: false
      });
      return RequestStatus;
  };