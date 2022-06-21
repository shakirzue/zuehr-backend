const dateformatehelper = require('../../helpers/datehelper');
module.exports = (sequelize, Sequelize) => {
    const ClockInOut = sequelize.define("Clock_InOut", {
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
      Date_Clock_In: {
        type: Sequelize.STRING,
        allowNull: false
      },
      Date_Clock_Out: {
        type: Sequelize.STRING,
        allowNull: true
      },
      Clock_In: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      Clock_Out: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      Clock_Difference: {
        type: Sequelize.DECIMAL(12,10),
        allowNull: true,
      },
      Latitude:{
        type: Sequelize.DECIMAL(12,10),
        allowNull: false
      },
      Longitude:{
        type: Sequelize.DECIMAL(12,10),
        allowNull: false
      },
      DistanceInKilometerFromOffice:{
        type: Sequelize.DECIMAL(10,8),
        allowNull: false
      },
      IsMachineRequest:{
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: 1
      }
    }, { 
        schema: 'hr',
        freezeTableName: true,
        timestamps: false
    });
    return ClockInOut;
  };