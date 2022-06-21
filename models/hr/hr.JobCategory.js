module.exports = (sequelize, Sequelize) => { 
    
      const JobCategory = sequelize.define("Job_Category", {      
        Description: {
          type: Sequelize.STRING
        }
      }, { 
          schema: 'hr',
          freezeTableName: true,
          timestamps: false
      });
      return JobCategory;
  };