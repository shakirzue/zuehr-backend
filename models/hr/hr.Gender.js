module.exports = (sequelize, Sequelize) => {
  const Gender = sequelize.define("Gender", {
    Gender_Id:{
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    GenderName: {
      type: Sequelize.STRING
    }
  }, {
    schema: 'hr',
    freezeTableName: true,
    timestamps: false
  });
  return Gender;
};