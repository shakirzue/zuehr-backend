module.exports = (sequelize, Sequelize) => {
    const UserShiftLink = sequelize.define("Hr_Shift_Employee_Detail", {
      User_Shift_Link_Id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
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
      Hr_Shift_Id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: {
              tableName: 'Hr_Shift', 
              schema: 'hr'
          },
            key: 'Hr_Shift_Id'
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