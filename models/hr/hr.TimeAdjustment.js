const dateformatehelper = require('../../helpers/datehelper');
module.exports = (sequelize, Sequelize) => {
    const TimeAdjustmentRequest = sequelize.define("TimeAdjustmentRequest", {
       Original_Time: {
        type: Sequelize.STRING,
        allowNull: false
      },
      Requested_Time: {
        type: Sequelize.STRING,
        allowNull: false
      },
      Comment: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      Request_Id: {
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
      ManageOn: {
        type: Sequelize.STRING,
        allowNull: true
      },
      ManageBy: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      Manager_Comment: {
        type: Sequelize.STRING
      },
      Reason_Id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: {
              tableName: 'Reason', 
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
    return TimeAdjustmentRequest;
  };