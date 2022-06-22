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
        allowNull: Sequelize.STRING
      },
      Token: {
        type: Sequelize.STRING,
        allowNull: false
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
