const dateformatehelper = require('../../helpers/datehelper');
module.exports = (sequelize, Sequelize) => {
    const LifeInsurance = sequelize.define("Life_Insurance", {
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
      Insurance_Provider: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      Policy_Number: {
        type: Sequelize.STRING,
        allowNull: false
      }, 
      Start_Date: {
        type: Sequelize.STRING,
        allowNull: false
      },    
      End_Date: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      Coverage_Details: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      Comment: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      CreatedBy: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      CreatedAt: {
        type: Sequelize.STRING,
        allowNull: false
      },
      UpdatedAt: {
        type: Sequelize.STRING
      }
    }, { 
        schema: 'hr',
        freezeTableName: true,
        timestamps: false
    });
    return LifeInsurance;
  };