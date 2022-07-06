const dateformatehelper = require('../../helpers/datehelper');
module.exports = (sequelize, Sequelize) => {
    const ShiftWeekDetail = sequelize.define("Hr_Shift_Week_Detail", {
      Shift_Week_Detail_Id : {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      Hr_Shift_Id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: {
              tableName: 'Hr_Shift', 
              schema: 'hr'
            },
            key: 'Hr_Shift_Id'
        }
      },    
      DayType: {
        type: Sequelize.STRING,
        allowNull: false,
      },  
      Day: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      StartTime: {
        type: Sequelize.TIME,
        allowNull: true,
      },
      EndTime: {
        type: Sequelize.TIME,
        allowNull: true
      },
      BreakDuration: {
        type: Sequelize.TIME,
        allowNull: true
      },
      FlexiIn: {
        type: Sequelize.TIME,
        allowNull: true
      },
      FlexiOut: {
        type: Sequelize.TIME,
        allowNull: true
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
    return ShiftWeekDetail;
  };