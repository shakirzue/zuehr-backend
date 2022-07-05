const dateformatehelper = require('../../helpers/datehelper');
module.exports = (sequelize, Sequelize) => {
    const EmployeeLeave = sequelize.define("Leave_Employee_Detail", {
      Employee_Leave_Id:{
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
      Balance: {
        type: Sequelize.INTEGER,
        allowNull: false,
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
    return EmployeeLeave;
  };