module.exports = (sequelize, Sequelize) => { 
    const Department = sequelize.define("Department", {
      
        Description: {
          type: Sequelize.STRING
        }
      }, { 
          schema: 'hr',
          freezeTableName: true,
          timestamps: false
      });
      return Department;
  };