module.exports = (sequelize, Sequelize) => {
    const User_Profile  = sequelize.define("User_Profile", {
     
      Name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      Phone: {
        type: Sequelize.STRING,      
      },
      ParentCompany: {
        type: Sequelize.STRING
      },
      
      Timezone: {
        type: Sequelize.STRING,
        allowNull: true
      },
      EmployeeNumber: {
        type: Sequelize.STRING,
        allowNull: false     
      },
      Email: {
        type: Sequelize.STRING,
        allowNull: false
      },
      Password: {
        type: Sequelize.STRING,
        allowNull: Sequelize.STRING
      },
      Token: {
        type: Sequelize.STRING,
        allowNull: false
      },
      // isActive: {
      //   type: Sequelize.BOOLEAN,
      //   allowNull: false,
      //   defaultValue: true
      // },
      createdAt: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.STRING,
        allowNull: true
      },
    },
    {
      freezeTableName: true,
      schema: 'admin',
      timestamps: false,      
    });
    return User_Profile;
  };
