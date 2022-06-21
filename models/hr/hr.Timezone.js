module.exports = (sequelize, Sequelize) => { 

    const Reason = sequelize.define("Timezone", {      
      Description: {
        type: Sequelize.STRING
      }
    }, { 
        schema: 'hr',
        freezeTableName: true,
        timestamps: false
    });
    return Reason;
};