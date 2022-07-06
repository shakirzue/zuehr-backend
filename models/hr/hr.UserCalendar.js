const dateformatehelper = require('../../helpers/datehelper');
module.exports = (sequelize, Sequelize) => {
    const UserCalendar = sequelize.define("User_Calendar", {
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
      Group_Id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: {
              tableName: 'Group', 
              schema: 'hr'
            },
            key: 'id'
        }
      },
      Company_Id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      Department_Id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: {
              tableName: 'Department', 
              schema: 'hr'
          },
            key: 'Department_Id'
        }
      },
      Month: {
        type: Sequelize.STRING,
        allowNull: false
      },
      Year: {
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
    return UserCalendar;
  };