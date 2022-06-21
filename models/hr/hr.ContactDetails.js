const dateformatehelper = require('../../helpers/datehelper');
module.exports = (sequelize, Sequelize) => { 
    const ContactDetails = sequelize.define("Contact_Details", {
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
      Number: {
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
    return ContactDetails;
};