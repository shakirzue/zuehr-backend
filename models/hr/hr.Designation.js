module.exports = (sequelize, Sequelize) => { 

      const Designation = sequelize.define("Designation", {   
        Designation_Id:{
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true
        }, 
        DesignationTitle: {
          type: Sequelize.STRING
        }
      }, { 
          schema: 'hr',
          freezeTableName: true,
          timestamps: false
      });
      return Designation;
  };