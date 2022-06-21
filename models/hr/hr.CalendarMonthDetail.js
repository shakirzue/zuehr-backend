const dateformatehelper = require('../../helpers/datehelper');
module.exports = (sequelize, Sequelize) => {
    const CalendarMonthDetail = sequelize.define("Calendar_Month_Detail", {
       Calendar_Id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: {
              tableName: 'User_Calendar', 
              schema: 'hr'
            },
            key: 'id'
        }
      },      
      Date: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      No_Change: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      Working: {
        type: Sequelize.BOOLEAN,
        allowNull: false
      },
      Off: {
        type: Sequelize.BOOLEAN,
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
    },{ 
        schema: 'hr',
        freezeTableName: true,
        timestamps: false
    });
    return CalendarMonthDetail;
  };