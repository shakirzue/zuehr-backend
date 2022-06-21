module.exports = (sequelize, Sequelize) => {
    const NonCpcgrUserProfile  = sequelize.define("NonCpcgrUserProfile", {
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
      UserProfileId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model:{
            tableName:'User_Profile',
            schema: 'admin'
            },
          key: 'id'
      }
      },
      // Phone: {
      //   type: Sequelize.STRING,
      //   allowNull: false
      // },
      // createdAt: {
      //   type: Sequelize.STRING,
      //   allowNull: false
      // },
      // updatedAt: {
      //   type: Sequelize.STRING,
      //   allowNull: true
      // },
    },
    {
      freezeTableName: true,
      schema: 'dbo',
      timestamps: false,      
    });
    return NonCpcgrUserProfile;
  };
