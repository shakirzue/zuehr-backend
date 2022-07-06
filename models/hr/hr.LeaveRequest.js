const dateformatehelper = require('../../helpers/datehelper');
module.exports = (sequelize, Sequelize) => {
    const LeaveRequest = sequelize.define("Leave_Request", {
      Leave_Request_Id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      Personal_Detail_Id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: {
            tableName: 'Personal_Details', 
            schema: 'hr'
          },
          key: 'Personal_Detail_Id'
      }
      },
      Leave_Type_Id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: {
              tableName: 'Leave_Request_Type', 
              schema: 'hr'
          },
            key: 'Leave_Type_Id'
        }
      },
      From_Date: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      To_Date: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      Reason: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      Request_Status_Id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: {
              tableName: 'Request_Status', 
              schema: 'hr'
          },
            key: 'Request_Id'
        }
      },
      UpdatedBy: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      CreatedBy: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      CreatedAt: {
        type: Sequelize.STRING,
        defaultValue: ()=>{
          return dateformatehelper.convertdatetopst(new Date())
        }
      },
      UpdatedAt: {
        type: Sequelize.STRING
      }
    }, { 
        schema: 'hr',
        freezeTableName: true,
        timestamps: false
    });
    return LeaveRequest;
  };