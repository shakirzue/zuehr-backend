module.exports = (sequelize, Sequelize) => { 

      const Designation = sequelize.define("Designation", {      
        Description: {
          type: Sequelize.STRING
        }
      }, { 
          schema: 'hr',
          freezeTableName: true,
          timestamps: false
      });
      return Designation;
  };