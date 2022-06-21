module.exports = (sequelize, Sequelize) => { 

      const LeaveRequestType = sequelize.define("Leave_Request_Type", {      
        Description: {
          type: Sequelize.STRING
        }
      }, { 
          schema: 'hr',
          freezeTableName: true,
          timestamps: false
      });
      return LeaveRequestType;
  };