module.exports = (sequelize, Sequelize) => { 

    const Reason = sequelize.define("Timezone", {      
      Timezone_Id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      TimezoneName: {
        type: Sequelize.STRING
      }
    }, { 
        schema: 'hr',
        freezeTableName: true,
        timestamps: false
    });
    return Reason;
};