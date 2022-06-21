module.exports = (sequelize, Sequelize) => { 
    const CardIssueStatus = sequelize.define("Card_Issue_Status_Type", {      
        Description: {
          type: Sequelize.STRING
        }
      }, { 
          schema: 'hr',
          freezeTableName: true,
          timestamps: false
      });
      return CardIssueStatus;
  };