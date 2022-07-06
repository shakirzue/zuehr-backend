module.exports = (sequelize, Sequelize) => { 

      const Location = sequelize.define("Location", {      
        Location_Id : {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true
        },
        LocationName: {
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
      return Location;
  };