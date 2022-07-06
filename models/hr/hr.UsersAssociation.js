const dateformatehelper = require('../../helpers/datehelper');
module.exports = (sequelize, Sequelize) => {
    const UserAssociation = sequelize.define("Hr_Users_association", {
       Assigned_To: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      Employee_id: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      Initiator: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      Status_Id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: {
              tableName: 'Request_Status', 
              schema: 'hr'
          },
            key: 'Request_Id'
        }
      },
      AssignedTo_Header: {
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
    return UserAssociation;
  };