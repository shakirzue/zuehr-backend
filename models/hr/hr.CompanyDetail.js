const dateformatehelper = require('../../helpers/datehelper');
module.exports = (sequelize, Sequelize) => {
  const CompanyDetail = sequelize.define("Company_Detail", {
    Personal_Detail_Id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: {
          tableName: 'Personal_Details', 
          schema: 'hr'
        },
        key: 'id'
    }
    },
    Group_Id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: {
          tableName: 'Group', 
          schema: 'hr'
      },
        key: 'id'
    }
    },
    Location_Id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: {
          tableName: 'Location', 
          schema: 'hr'
      },
        key: 'id'
    }
    },
    Company_Domain_Id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: {
          tableName: 'Company_Domain', 
          schema: 'hr'
      },
        key: 'id'
    }
    },
    Business_Unit_Id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: {
          tableName: 'Business_Unit', 
          schema: 'hr'
      },
        key: 'id'
    }
    },
    Department_Id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: {
          tableName: 'Department', 
          schema: 'hr'
      },
        key: 'id'
    }
    },
    Job_Category_Id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: {
          tableName: 'Job_Category', 
          schema: 'hr'
      },
        key: 'id'
    }
    }, 
    Designation_Id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: {
          tableName: 'Designation', 
          schema: 'hr'
      },
        key: 'id'
    }
    },
    Campaign_Id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: {
          tableName: 'Campaign', 
          schema: 'hr'
      },
        key: 'id'
    }
    },
    Requisition_Id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: {
          tableName: 'Requisition_Number', 
          schema: 'hr'
      },
        key: 'id'
    }
    },
    CreatedBy: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    CreatedAt: {
      type: Sequelize.STRING,
      defaultValue: ()=>{
          return dateformatehelper.convertdatetopst(new Date())
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