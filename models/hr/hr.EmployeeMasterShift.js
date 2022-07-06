const dateformatehelper = require('../../helpers/datehelper');
module.exports = (sequelize, Sequelize) => {
    const MasterShift = sequelize.define("Employee_MasterShift", {
      MasterShift_Id: {
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
      Timezone_Id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: {
              tableName: 'Timezone', 
              schema: 'hr'
            },
            key: 'Timezone_Id'
        }
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
    return MasterShift;
  };