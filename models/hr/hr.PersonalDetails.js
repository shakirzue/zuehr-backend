const dateformatehelper = require('../../helpers/datehelper');
module.exports = (sequelize, Sequelize) => {
    const User_Profile  = sequelize.define("Personal_Details", {
      User_Profile_Id: {
        type: Sequelize.INTEGER,
        allowNull: true     
      },
      EmployeeId: {
        type: Sequelize.STRING,
        allowNull: false
      },
      FirstName: {
        type: Sequelize.STRING,
        allowNull: false
      },
      MiddleName: {
        type: Sequelize.STRING,
        allowNull: false
      },
      LastName: {
        type: Sequelize.STRING
      },
      Phone: {
        type: Sequelize.STRING,      
      },      
      DateOfBirth: {
        type: Sequelize.STRING
      },
      Guardian_Name: {
        type: Sequelize.STRING
      },
      DateOfJoining: {
        type: Sequelize.STRING
      },
      Gender_Id: {
        type: Sequelize.INTEGER,
        references: {
            model: {
              tableName: 'Gender', 
              schema: 'hr'
          },
            key: 'id'
        }
      },
      Email: {
        type: Sequelize.STRING
      },
      IdentityNumber: {
        type: Sequelize.STRING
      },
      isActive: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true
      },
      createdAt: {
        type: Sequelize.STRING,
        // defaultValue: ()=>{
        //   return dateformatehelper.convertdatetopst(new Date())
        // },
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.STRING,
      
        allowNull: true,
      },
    },
    {
      freezeTableName: true,
      schema: 'hr',
      timestamps: false,      
    });
    return User_Profile;
  };
