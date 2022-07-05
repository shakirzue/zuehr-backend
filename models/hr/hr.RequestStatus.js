module.exports = (sequelize, Sequelize) => { 

      const RequestStatus = sequelize.define("Request_Status", {      
        Request_Id:{
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true
        },
        RequestTitle: {
          type: Sequelize.STRING
        }
      }, { 
          schema: 'hr',
          freezeTableName: true,
          timestamps: false
      });
      return RequestStatus;
  };