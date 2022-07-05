const dateformatehelper = require('../../helpers/datehelper');
module.exports = (sequelize, Sequelize) => { 
    const ProfessionalReference = sequelize.define("Professional_References", {
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
      Name: {
        type: Sequelize.STRING,
        allowNull: false,
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
      Number: {
        type: Sequelize.STRING,
        allowNull: false
      },
      Company_Name: {
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
    return ProfessionalReference;
};