module.exports = (sequelize, Sequelize) => { 

      const LeaveRequestType = sequelize.define("Leave_Request_Type", {      
        Leave_Type_Id : {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true
        },
        Request_Type_Name: {
          type: Sequelize.STRING
        }
      }, { 
          schema: 'hr',
          freezeTableName: true,
          timestamps: false
      });
      return LeaveRequestType;
  };