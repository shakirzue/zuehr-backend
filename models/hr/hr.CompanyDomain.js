module.exports = (sequelize, Sequelize) => { 
    const CompanyDomain = sequelize.define("Company_Domain", {
      
        Description: {
          type: Sequelize.STRING
        }
      }, { 
          schema: 'hr',
          freezeTableName: true,
          timestamps: false
      });
      return CompanyDomain;
  };