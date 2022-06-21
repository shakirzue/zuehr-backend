module.exports = (sequelize, Sequelize) => {

    const Qualification = sequelize.define("Qualification", {      
        Description: {
          type: Sequelize.STRING
        }
      }, { 
          schema: 'hr',
          freezeTableName: true,
          timestamps: false
      });
      return Qualification;

  };