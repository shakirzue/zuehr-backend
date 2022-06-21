module.exports = (sequelize, Sequelize) => {
    const UserShiftLink = sequelize.define("User_Shift_Link", {
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
      Shift_Id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: {
              tableName: 'Hr_Shift', 
              schema: 'hr'
          },
            key: 'id'
        }
      },
      FromDate: {
        type: Sequelize.STRING,
        allowNull: false
      },
      IsActive: {
        type: Sequelize.BOOLEAN,
        allowNull: false
      }
    }, { 
        schema: 'hr',
        freezeTableName: true,
        timestamps: false
    });
    return UserShiftLink;
  };