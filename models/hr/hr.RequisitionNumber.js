module.exports = (sequelize, Sequelize) => { 

      const RequisitionNumber = sequelize.define("Requisition_Number", {      
        Description: {
          type: Sequelize.STRING
        }
      }, { 
          schema: 'hr',
          freezeTableName: true,
          timestamps: false
      });
      return RequisitionNumber;
  };