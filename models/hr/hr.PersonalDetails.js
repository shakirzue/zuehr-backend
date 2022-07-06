const dateformatehelper = require('../../helpers/datehelper');
const { DataTypes } = require('sequelize');
module.exports = (sequelize, Sequelize) => {
    const User_Profile  = sequelize.define("Personal_Details", {
      Personal_Detail_Id : {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      User_Profile_Id: {
        type: Sequelize.INTEGER,
        allowNull: true     
      },
      Company_Id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: {
            tableName: 'Company_Detail', 
            schema: 'hr'
          },
          key: 'Company_Id'
        }
      },
      Location_Id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: {
            tableName: 'Location', 
            schema: 'hr'
          },
          key: 'Location_Id'
        }
      },
      Department_Id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: {
            tableName: 'Department', 
            schema: 'hr'
          },
          key: 'Department_Id'
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
      EmployeeCode: {
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
            key: 'Gender_Id'
        }
      },
      Email: {
        type: Sequelize.STRING
      },
      Official_Email: {
        type: Sequelize.STRING,
        allowNull:true
      },
      IdentityNumber: {
        type: Sequelize.STRING
      },
      isActive: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true
      },
      isExecutive: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true
      },
      ReportingUserId: {
        type: Sequelize.INTEGER,
        allowNull: true,
      //   references: {
      //     model: {
      //       tableName: 'Personal_Detail', 
      //       schema: 'hr'
      //   },
      //     key: 'Personal_Detail_Id'
      // }
      },
      createdAt: {
        type: Sequelize.STRING,
        defaultValue: ()=>{
          return new Date().toJSON();
        },
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
