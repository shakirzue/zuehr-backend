const dateformatehelper = require('../../helpers/datehelper');
module.exports = (sequelize, Sequelize) => { 

    const Academic = sequelize.define("Academic", {
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
      InstitudeName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      Degree_Title: {
        type: Sequelize.STRING,
        allowNull: false
      },
      Grade: {
        type: Sequelize.STRING,
        allowNull: false
      },
      Year_Passed: {
        type: Sequelize.STRING,
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
    return Academic;
};