module.exports = (sequelize, Sequelize) => {
    const DeptShiftLink = sequelize.define("Department_Shift_Link", {
      Department_Id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: {
                tableName: 'Department', 
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
      }
    }, { 
        schema: 'hr',
        freezeTableName: true,
        timestamps: false
    });
    return DeptShiftLink;
  };