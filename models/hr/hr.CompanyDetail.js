const dateformatehelper = require('../../helpers/datehelper');
const { DataTypes } = require('sequelize');
module.exports = (sequelize, Sequelize) => {
  const CompanyDetail = sequelize.define("Company_Detail", {
    Company_Id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    Name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    CreatedBy: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    CreatedAt: {
      type: Sequelize.STRING,
      defaultValue: ()=>{
          return new Date().toJSON();
        }
    },
    UpdatedAt: {
      type: Sequelize.STRING
    }
  }, { 
      schema: 'hr',
      freezeTableName: true,
      timestamps: false
  });
  return CompanyDetail;
};