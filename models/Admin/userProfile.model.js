module.exports = (sequelize, Sequelize) => {
    const User_Profile  = sequelize.define("User_Profile", {
      Timezone: {
        type: Sequelize.STRING,
        allowNull: true
      },
      EmployeeNumber: {
        type: Sequelize.STRING,
        allowNull: false ,
        unique: true    
      },
      Email: {
        type: Sequelize.STRING,
        allowNull: false
      },
      Password: {
        type: Sequelize.STRING,
        allowNull: false
      },
      Token: {
        type: Sequelize.STRING,
        allowNull: false
      },
      IsPasswordReset: {
        type: Sequelize.BOOLEAN,
        allowNull: true
      },
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
