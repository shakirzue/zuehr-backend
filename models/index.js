const dbConfig = require('../config/db.config');
const Sequelize = require("sequelize");

console.log(process.env.LOCAL_DB_DB_NAME,process.env.LOCAL_DB_USERNAME,process.env.LOCAL_DB_PASSWORD)
const sequelize = new Sequelize(process.env.LOCAL_DB_DB_NAME, 
  process.env.LOCAL_DB_USERNAME, 
  process.env.LOCAL_DB_PASSWORD, {
  dialect: 'mssql',
  logging:false,
  dialectOptions: {    
    // options: {
    //   useUTC: false,
    //   typeCast: true,
    //   timezone: 'Pakistan Standard Time',
    //   dateStrings: true,
    // },
    //timezone: 'Pakistan Standard Time',
   // operatorsAliases: false
  }
});

sequelize.authenticate()
.then(() => {
   console.log('connection created.');
})
.catch(err => {
    console.log("Error"+err);
})

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// =====================  HR Association Relationship  ====================
db.qualification = require("./hr/hr.Qualification.js")(sequelize, Sequelize);
db.relationship = require("./hr/hr.Relationship.js")(sequelize, Sequelize);
db.businessUnit = require("./hr/hr.BusinessUnit.js")(sequelize, Sequelize);
db.campaign = require("./hr/hr.Campaign.js")(sequelize, Sequelize);
db.companyDomain = require("./hr/hr.CompanyDomain.js")(sequelize, Sequelize);
db.costCenter = require("./hr/hr.CostCenter.js")(sequelize, Sequelize);
db.department = require("./hr/hr.Department.js")(sequelize, Sequelize);
db.designation = require("./hr/hr.Designation.js")(sequelize, Sequelize);
db.group = require("./hr/hr.Group.js")(sequelize, Sequelize);
db.gender = require("./hr/hr.Gender.js")(sequelize, Sequelize);
db.hrModuleType = require("./hr/hr.HrModuleType.js")(sequelize, Sequelize);
db.jobCategory = require("./hr/hr.JobCategory.js")(sequelize, Sequelize);
db.leaveRequestType = require("./hr/hr.LeaveRequestType.js")(sequelize, Sequelize);
db.location = require("./hr/hr.Location.js")(sequelize, Sequelize);
db.reason = require("./hr/hr.Reason.js")(sequelize, Sequelize);
db.requestStatus = require("./hr/hr.RequestStatus.js")(sequelize, Sequelize);
db.requisitionNumber = require("./hr/hr.RequisitionNumber.js")(sequelize, Sequelize);
db.timezone = require("./hr/hr.Timezone.js")(sequelize, Sequelize);

db.personalDetails = require("./hr/hr.PersonalDetails.js")(sequelize, Sequelize); 
db.familyInformation = require("./hr/hr.FamilyInformation.js")(sequelize, Sequelize);
db.bankDetail = require("./hr/hr.BankDetail.js")(sequelize, Sequelize);  
db.companyDetail = require("./hr/hr.CompanyDetail.js")(sequelize, Sequelize);  
db.documentUpload = require("./hr/hr.DocumentUpload.js")(sequelize, Sequelize);
db.experience = require("./hr/hr.Experience.js")(sequelize, Sequelize); 
db.academic = require("./hr/hr.Academic.js")(sequelize, Sequelize);
db.professionalReference = require("./hr/hr.ProfessionalReference.js")(sequelize, Sequelize);
db.contactDetails = require("./hr/hr.ContactDetails.js")(sequelize, Sequelize);
db.lifeInsurance = require("./hr/hr.LifeInsurance.js")(sequelize, Sequelize);

db.calendarMonthDetail = require("./hr/hr.CalendarMonthDetail.js")(sequelize, Sequelize);
db.clockInOut = require("./hr/hr.ClockInOut.js")(sequelize, Sequelize);
db.employeeLeave = require("./hr/hr.EmployeeLeave.js")(sequelize, Sequelize);
db.leaveRequest = require("./hr/hr.LeaveRequest.js")(sequelize, Sequelize);
db.shiftWeekDetail = require("./hr/hr.ShiftWeekDetail.js")(sequelize, Sequelize);
db.timeAdjustment = require("./hr/hr.TimeAdjustment.js")(sequelize, Sequelize);
db.userCalendar = require("./hr/hr.UserCalendar.js")(sequelize, Sequelize);
db.usersAssociation = require("./hr/hr.UsersAssociation.js")(sequelize, Sequelize);
db.userShiftLink = require("./hr/hr.UserShiftLink.js")(sequelize, Sequelize);
db.deptShiftLink = require("./hr/hr.DepartmentShiftLink.js")(sequelize, Sequelize);
db.hrShift = require("./hr/hr.HrShift.js")(sequelize, Sequelize); 

db.relationship.hasMany(db.familyInformation,{foreignKey:'Relationship_Id'});
db.relationship.hasMany(db.professionalReference,{foreignKey:'Relationship_Id'});
db.relationship.hasMany(db.contactDetails,{foreignKey:'Relationship_Id'});

db.designation.hasMany(db.experience,{foreignKey:'Designation_Id'});
db.designation.hasMany(db.professionalReference,{foreignKey:'Designation_Id'});

db.qualification.hasMany(db.familyInformation,{foreignKey:'Qualification_Id'});

db.hrModuleType.hasMany(db.documentUpload,{foreignKey:'Hr_Module_Type_Id'});

db.gender.hasMany(db.personalDetails,{foreignKey:'Gender_Id'});

db.timezone.hasMany(db.hrShift,{foreignKey:'Timezone_Id'});

db.personalDetails.hasMany(db.familyInformation,{foreignKey:'Personal_Detail_Id'});
db.personalDetails.hasMany(db.bankDetail,{foreignKey:'Personal_Detail_Id'});
db.personalDetails.hasMany(db.companyDetail,{foreignKey:'Personal_Detail_Id'});
db.personalDetails.hasMany(db.documentUpload,{foreignKey:'Personal_Detail_Id'});
db.personalDetails.hasMany(db.experience,{foreignKey:'Personal_Detail_Id'});
db.personalDetails.hasMany(db.academic,{foreignKey:'Personal_Detail_Id'});
db.personalDetails.hasMany(db.professionalReference,{foreignKey:'Personal_Detail_Id'});
db.personalDetails.hasMany(db.contactDetails,{foreignKey:'Personal_Detail_Id'});
db.personalDetails.hasMany(db.lifeInsurance,{foreignKey:'Personal_Detail_Id'});
db.personalDetails.hasMany(db.clockInOut,{foreignKey:'Personal_Detail_Id'});

db.familyInformation.belongsTo(db.relationship,{foreignKey:'Relationship_Id'});
db.familyInformation.belongsTo(db.qualification,{foreignKey:'Qualification_Id'});
db.familyInformation.belongsTo(db.personalDetails,{foreignKey:'Personal_Detail_Id'});

db.documentUpload.belongsTo(db.hrModuleType,{foreignKey:'Hr_Module_Type_Id'});
db.documentUpload.belongsTo(db.personalDetails,{foreignKey:'Personal_Detail_Id'});

db.experience.belongsTo(db.designation,{foreignKey:'Designation_Id'});
db.experience.belongsTo(db.personalDetails,{foreignKey:'Personal_Detail_Id'});

db.group.hasMany(db.companyDetail,{foreignKey:'Group_Id'});
db.group.hasMany(db.userCalendar,{foreignKey:'Group_Id'});

db.location.hasMany(db.companyDetail,{foreignKey:'Location_Id'});

db.companyDomain.hasMany(db.companyDetail,{foreignKey:'Company_Domain_Id'});

db.businessUnit.hasMany(db.companyDetail,{foreignKey:'Business_Unit_Id'});

db.jobCategory.hasMany(db.companyDetail,{foreignKey:'Job_Category_Id'});

db.designation.hasMany(db.companyDetail,{foreignKey:'Designation_Id'});

db.requisitionNumber.hasMany(db.companyDetail,{foreignKey:'Requisition_Id'});

db.campaign.hasMany(db.companyDetail,{foreignKey:'Campaign_Id'});

db.reason.hasMany(db.timeAdjustment,{foreignKey:'Reason_Id'});

db.department.hasMany(db.companyDetail,{foreignKey:'Department_Id'});
db.department.hasMany(db.userCalendar,{foreignKey:'Department_Id'});

db.requestStatus.hasMany(db.timeAdjustment,{foreignKey:'Status_Id'});
db.requestStatus.hasMany(db.leaveRequest,{foreignKey:'Status_Id'});

db.leaveRequestType.hasMany(db.employeeLeave,{foreignKey:'Leave_Type_Id'});
db.leaveRequestType.hasMany(db.leaveRequest,{foreignKey:'Leave_Type_Id'});

db.companyDetail.belongsTo(db.group,{foreignKey:'Group_Id'});
db.companyDetail.belongsTo(db.location,{foreignKey:'Location_Id'});
db.companyDetail.belongsTo(db.companyDomain,{foreignKey:'Company_Domain_Id'});
db.companyDetail.belongsTo(db.businessUnit,{foreignKey:'Business_Unit_Id'});
db.companyDetail.belongsTo(db.jobCategory,{foreignKey:'Job_Category_Id'});
db.companyDetail.belongsTo(db.designation,{foreignKey:'Designation_Id'});
db.companyDetail.belongsTo(db.campaign,{foreignKey:'Campaign_Id'});
db.companyDetail.belongsTo(db.requisitionNumber,{foreignKey:'Requisition_Id'});
db.companyDetail.belongsTo(db.department,{foreignKey:'Department_Id'});
db.companyDetail.belongsTo(db.personalDetails,{foreignKey:'Personal_Detail_Id'});

db.timeAdjustment.belongsTo(db.requestStatus,{foreignKey:'Status_Id'});
db.timeAdjustment.belongsTo(db.reason,{foreignKey:'Reason_Id'});

db.employeeLeave.belongsTo(db.leaveRequestType,{foreignKey:'Leave_Type_Id'});
db.employeeLeave.belongsTo(db.personalDetails,{foreignKey:'Personal_Detail_Id'});

db.shiftWeekDetail.belongsTo(db.hrShift,{foreignKey:'Shift_Id'});

db.leaveRequest.belongsTo(db.leaveRequestType,{foreignKey:'Leave_Type_Id'});
db.leaveRequest.belongsTo(db.requestStatus,{foreignKey:'Status_Id'});
db.leaveRequest.belongsTo(db.personalDetails,{foreignKey:'Personal_Detail_Id'});

db.userCalendar.belongsTo(db.group,{foreignKey:'Group_Id'});
db.userCalendar.belongsTo(db.department,{foreignKey:'Department_Id'});
db.userCalendar.belongsTo(db.personalDetails,{foreignKey:'Personal_Detail_Id'});
db.userCalendar.hasMany(db.calendarMonthDetail,{foreignKey:'Calendar_Id'});

db.calendarMonthDetail.belongsTo(db.userCalendar,{foreignKey:'Calendar_Id'});

db.contactDetails.belongsTo(db.relationship,{foreignKey:'Relationship_Id'});
db.contactDetails.belongsTo(db.personalDetails,{foreignKey:'Personal_Detail_Id'});

db.hrShift.belongsTo(db.timezone,{foreignKey:'Timezone_Id'});
db.hrShift.hasMany(db.shiftWeekDetail,{foreignKey:'Shift_Id'});
db.hrShift.hasMany(db.userShiftLink, {foreignKey:'Shift_Id'});
db.hrShift.hasMany(db.deptShiftLink, {foreignKey:'Shift_Id'});

db.shiftWeekDetail.belongsTo(db.hrShift,{foreignKey:'Shift_Id'});

db.userShiftLink.belongsTo(db.hrShift, {foreignKey:'Shift_Id'});
db.userShiftLink.belongsTo(db.personalDetails,{foreignKey:'Personal_Detail_Id'});

db.deptShiftLink.belongsTo(db.hrShift, {foreignKey:'Shift_Id'});

db.professionalReference.belongsTo(db.designation,{foreignKey:'Designation_Id'});
db.professionalReference.belongsTo(db.relationship,{foreignKey:'Relationship_Id'});
db.professionalReference.belongsTo(db.personalDetails,{foreignKey:'Personal_Detail_Id'});

db.personalDetails.belongsTo(db.gender,{foreignKey:'Gender_Id'});
db.personalDetails.hasMany(db.leaveRequest,{foreignKey:'Personal_Detail_Id'});

db.clockInOut.belongsTo(db.personalDetails,{foreignKey:'Personal_Detail_Id'});
// =====================  Admin Association Relationship  ====================
db.userProfile    = require("./Admin/userProfile.model")(sequelize, Sequelize);
// db.nonCpcgrUserProfile    = require("./Admin/NonCpcgrUserProfile")(sequelize, Sequelize);
// db.userProfile.hasMany(db.nonCpcgrUserProfile,{foreignKey:'UserProfileId'});
// db.nonCpcgrUserProfile.belongsTo(db.userProfile,{foreignKey:'UserProfileId'});

module.exports = db;