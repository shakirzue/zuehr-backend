const dateformatehelper = require('../../helpers/datehelper');
module.exports = (sequelize, Sequelize) => {
    const FamilyInformation = sequelize.define("Family_Information", {
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
        MemberName: {
          type: Sequelize.STRING
        },
        Relationship_Id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: {
              tableName: 'Relationship', 
              schema: 'hr'
          },
            key: 'id'
        }
        },
        DateOfBirth: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        Qualification_Id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: {
              tableName: 'Qualification', 
              schema: 'hr'
          },
            key: 'id'
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
      return FamilyInformation;
  };