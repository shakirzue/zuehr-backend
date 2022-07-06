const dateformatehelper = require('../../helpers/datehelper');
module.exports = (sequelize, Sequelize) => {
    const Shift = sequelize.define("Hr_Shift", {
      Hr_Shift_Id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      Company_Id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: {
              tableName: 'Company_Detail', 
              schema: 'hr'
            },
            key: 'Company_Id'
        }
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
      Shift_Name: {
        type: Sequelize.STRING,
        allowNull: false
      }, 
      Description: {
        type: Sequelize.STRING,
        allowNull: false
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
    return Shift;
  };