const dateformatehelper = require('../../helpers/datehelper');
module.exports = (sequelize, Sequelize) => {
    const MasterShiftDetail = sequelize.define("Employee_MasterShift_Detail", {
      MasterShift_Detail_Id : {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      MasterShift_Id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: {
              tableName: 'Employee_MasterShift', 
              schema: 'hr'
            },
            key: 'MasterShift_Id'
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
    return MasterShiftDetail;
  };