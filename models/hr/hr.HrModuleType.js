module.exports = (sequelize, Sequelize) => { 

      const HrModuleType = sequelize.define("Hr_Module_Type", {      
        Description: {
          type: Sequelize.STRING
        },
        IsMandatory: {
          type: Sequelize.BOOLEAN
        }
      }, { 
          schema: 'hr',
          freezeTableName: true,
          timestamps: false
      });
      return HrModuleType;
  };