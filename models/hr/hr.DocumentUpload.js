const dateformatehelper = require('../../helpers/datehelper');
module.exports = (sequelize, Sequelize) => { 
      const DocumentUpload = sequelize.define("Document_Upload", {
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
        Hr_Module_Type_Id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: {
              tableName: 'Hr_Module_Type', 
              schema: 'hr'
          },
            key: 'id'
        }
        },
        Document_Path: {
          type: Sequelize.STRING,
          allowNull: false
        },
        Document_Name: {
          type: Sequelize.STRING,
          allowNull: false
        },
        Document_Extension: {
          type: Sequelize.STRING,
          allowNull: false
        },
        Comment: {
          type: Sequelize.STRING
        },
        Description: {
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
      return DocumentUpload;
  };