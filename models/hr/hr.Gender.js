module.exports = (sequelize, Sequelize) => {
  const Gender = sequelize.define("Gender", {
    Description: {
      type: Sequelize.STRING
    }
  }, {
    schema: 'hr',
    freezeTableName: true,
    timestamps: false
  });
  return Gender;
};