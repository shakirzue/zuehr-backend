const dateformatehelper = require('../../helpers/datehelper');
module.exports = (sequelize, Sequelize) => {
    const Shift = sequelize.define("Hr_Shift", {
      // Group_Id: {
      //   type: Sequelize.INTEGER,
      //   allowNull: false,
      //   references: {
      //       model: {
      //         tableName: 'Group', 
      //         schema: 'hr'
      //       },
      //       key: 'id'
      //   }
      // },
      Company_Id: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      Shift_Name: {
        type: Sequelize.STRING,
        allowNull: false
      }, 
      Description: {
        type: Sequelize.STRING,
        allowNull: false
      },    
      Timezone_Id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: {
              tableName: 'Timezone', 
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
    return Shift;
  };