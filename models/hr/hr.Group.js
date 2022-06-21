module.exports = (sequelize, Sequelize) => {  
  const Group = sequelize.define("Group", {      
    Description: {
      type: Sequelize.STRING
    }
  }, {
      schema: 'hr',
      freezeTableName: true,
      timestamps: false
  });
  return Group;
};