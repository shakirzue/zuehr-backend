const dateformatehelper = require('../../helpers/datehelper');
module.exports = (sequelize, Sequelize) => {
      const Experience = sequelize.define("Experience", {
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
        CompanyName: {
          type: Sequelize.STRING,
          allowNull: false
        },
        FromYear: {
          type: Sequelize.STRING,
          allowNull: false
        },
        ToYear: {
          type: Sequelize.STRING,
          allowNull: false
        },
        Designation_Id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: {
              tableName: 'Designation', 
              schema: 'hr'
          },
            key: 'Designation_Id'
        }
        },
        Details:{
            type: Sequelize.STRING
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
      return Experience;
  };