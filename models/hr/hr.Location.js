module.exports = (sequelize, Sequelize) => { 

      const Location = sequelize.define("Location", {      
        Description: {
          type: Sequelize.STRING
        }
      }, { 
          schema: 'hr',
          freezeTableName: true,
          timestamps: false
      });
      return Location;
  };