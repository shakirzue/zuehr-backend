module.exports = (sequelize, Sequelize) => { 
    const Department = sequelize.define("Department", {
        Department_Id : {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true
        },
        DepartmentName: {
          type: Sequelize.STRING
        },
        Company_Id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: {
              tableName: 'Company_Detail', 
              schema: 'hr'
            },
            key: 'Company_Id'
          }
        }
      }, { 
          schema: 'hr',
          freezeTableName: true,
          timestamps: false
      });
      return Department;
  };