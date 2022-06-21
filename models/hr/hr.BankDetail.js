const dateformatehelper = require('../../helpers/datehelper');
module.exports = (sequelize, Sequelize) => { 

      const BankDetails = sequelize.define("Bank_Details", {
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
        Iban: {
          type: Sequelize.STRING,
          allowNull: false
        },
        Bic: {
          type: Sequelize.STRING
        },
        Title: {
          type: Sequelize.STRING,
          allowNull: false
        },
        BankName: {
          type: Sequelize.STRING,
          allowNull: false
        },
        BranchName:{
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
      return BankDetails;

  };