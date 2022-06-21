const dateformatehelper = require('../../helpers/datehelper');
module.exports = (sequelize, Sequelize) => {
    const LeaveRequest = sequelize.define("Leave_Request", {
      Personal_Detail_Id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: {
            tableName: 'Personal_Details', 
            schema: 'hr'
          },
          key: 'id'
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
            key: 'id'
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
      Status_Id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: {
              tableName: 'Request_Status', 
              schema: 'hr'
          },
            key: 'id'
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