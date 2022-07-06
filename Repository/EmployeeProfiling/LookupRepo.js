const { QueryTypes } = require('sequelize');
const path = require('path');
const { sequelize } = require("../../models");
const db = require("../../models");
const Op = db.Sequelize.Op;

const dateformatehelper = require('../../helpers/datehelper');
const timeZoneType = require('../../helpers/TimeZoneTypes');
const mischelper = require('../../helpers/mischelper');
const userprofilehelper = require('../../helpers/userprofilehelper');

const Company = db.companyDetail;
const BusinessUnit = db.businessUnit;
const Campaign = db.campaign;
const CompanyDomain = db.companyDomain;
const CostCenter = db.costCenter;
const Department = db.department;
const Designation = db.designation;
const Group = db.group;
const HrModuleType = db.hrModuleType;
const HrSeparationStatus = db.separationStatus;
const JobCategory = db.jobCategory;
const LeaveRequestType = db.leaveRequestType;
const Location = db.location;
const Qualification = db.qualification;
const Reason = db.reason;
const Relationship = db.relationship;
const RequestStatus = db.requestStatus;
const RequisitionNumber = db.requisitionNumber;
const TerminationType = db.terminationType;
const Gender = db.gender;
const Timezone = db.timezone;

exports.createCompany = async (req, res) => {
	if (!req.body.Name) {
		return ({ status: 400,
			message: "Content can not be empty!"
		});
		return;
	}
	const company = {
		Name: req.body.Name,
		CreatedBy: req.body.userProfileId,
	};
	const com = await Company.create(company);
	if (com) {
		return ({ status: 200, message: 'Success', data: com });
	}
	else {
		return ({ status: 500, message: 'Error while saving record' });
	}
};

exports.findAllCompany = async (req, res) => {
	const finddata = await getAllCompany();
	if (finddata) {
		return ({ status: 200, message: 'Success', data: finddata });
	}
    else{
		return ({ status: 500, message: 'Unsuccess: record not found', data: {} });
	}
};

exports.createBusinessUnit = async (req, res) => {
	if (!req.body.Description) {
		return ({ status: 400,
			message: "Content can not be empty!"
		});
		return;
	}
	const businessUnit = {
		Description: req.body.Description
	};
	const bu = await BusinessUnit.create(businessUnit);
	if (bu) {
		return ({ status: 200, message: 'Success', data: bu });
	}
	else {
		return ({ status: 500, message: 'Error while saving record' });
	}
};

exports.findAllBusinessUnit = async (req, res) => {
	const finddata = await getAllBusinessUnit;
	if (finddata) {
		return ({ status: 200, message: 'Success', data: finddata });
	}
    else{
		return ({ status: 500, message: 'Unsuccess: record not found', data: {} });
	}
};

exports.createCampaign = async (req, res) => {
	if (!req.body.Description) {
		return ({ status: 400,
			message: "Content can not be empty!"
		});
		return;
	}
	const campaign = {
		Description: req.body.Description
	};
	const cam = await Campaign.create(campaign);
	if (cam) {
		return ({ status: 200, message: 'Success', data: cam });
	}
	else {
		return ({ status: 500, message: 'Error while saving record' });
	}
};

exports.findAllCampaign = async (req, res) => {
	const finddata = await getAllCampaign;
	if (finddata) {
		return ({ status: 200, message: 'Success', data: finddata });
	}
    else{
		return ({ status: 500, message: 'Unsuccess: record not found', data: {} });
	}
};

exports.findAllCardIssueStatus = async (req, res) => {
	const finddata = await getAllCardIssueStatus();
	if (finddata) {
		return ({ status: 200, message: 'Success', data: finddata });
	}
	else {
		return ({ status: 500, message: 'Unsuccessful: record not found' });
	}
};

exports.createCompanyDomain = async (req, res) => {
	if (!req.body.Description) {
		return ({ status: 400,
			message: "Content can not be empty!"
		});
		return;
	}
	const companyDomain = {
		Description: req.body.Description
	};
	const cd = await CompanyDomain.create(companyDomain);
	if (cd) {
		return ({ status: 200, message: 'Success', data: cd });
	}
	else {
		return ({ status: 500, message: 'Error while saving record' });
	}
};

exports.findAllCompanyDomain = async (req, res) => {
	const finddata = await getAllCompanyDomain;
	if (finddata) {
		return ({ status: 200, message: 'Success', data: finddata });
	}
};

exports.createCostCenter = async (req, res) => {
	if (!req.body.Description) {
		return ({ status: 400,
			message: "Content can not be empty!"
		});
		return;
	}
	const costCenter = {
		Description: req.body.Description
	};
	const cc = await CostCenter.create(costCenter);
	if (cc) {
		return ({ status: 200, message: 'Success', data: cc });
	}
	else {
		return ({ status: 500, message: 'Error while saving record' });
	}
};

exports.findAllCostCenter = async (req, res) => {
	const finddata = await getAllCostCenter;
	if (finddata) {
		return ({ status: 200, message: 'Success', data: finddata });
	}
};

exports.createDepartment = async (req, res) => {
	if (!req.body.Description) {
		return ({ status: 400,
			message: "Content can not be empty!"
		});
		return;
	}
	const department = {
		Company_Id: req.body.companyId,
		DepartmentName: req.body.Description
	};
	const dept = await Department.create(department);
	if (dept) {
		return ({ status: 200, message: 'Success', data: dept });
	}
	else {
		return ({ status: 500, message: 'Error while saving record' });
	}
};

exports.findAllDepartment = async (req, res) => {
	const finddata = await getAllDepartment();
	if (finddata) {
		return ({ status: 200, message: 'Success', data: finddata });
	}
};

exports.findDepartmentByCompanyId = async (req, res) => {
	const finddata = await Department.findAll({ where:{Company_Id : req.body.companyId}});
	if (finddata) {
		return ({ status: 200, message: 'Success', data: finddata });
	}
};

exports.createDesignation = async (req, res) => {
	if (!req.body.Description) {
		return ({ status: 400,
			message: "Content can not be empty!"
		});
		return;
	}
	const designation = {
		Description: req.body.Description
	};
	const des = await Designation.create(designation);
	if (des) {
		return ({ status: 200, message: 'Success', data: des });
	}
	else {
		return ({ status: 500, message: 'Error while saving record' });
	}
};

exports.findAllDesignation = async (req, res) => {
	const finddata = await getAllDesignation();
	if (finddata) {
		return ({ status: 200, message: 'Success', data: finddata });
	}
};

exports.createGroup = async (req, res) => {
	if (!req.body.Description) {
		return ({ status: 400,
			message: "Content can not be empty!"
		});
		return;
	}
	const group = {
		Description: req.body.Description
	};
	const grp = await Group.create(group);
	if (grp) {
		return ({ status: 200, message: 'Success', data: grp });
	}
	else {
		return ({ status: 500, message: 'Error while saving record' });
	}
};

exports.findAllGroup = async (req, res) => {
	const data = await Group.findAll({ include: Company });
	res.status(200).send({ status: 200, message: 'Success', data: data });
	// const finddata = await getAllGroup;
	// if(finddata){
	//   return ({status:1, message:'Success', data:finddata});
	// }
};

exports.createHrModuleType = async (req, res) => {
	if (!req.body.Description) {
		return ({ status: 400,
			message: "Content can not be empty!"
		});
		return;
	}
	const hrModuleType = {
		Description: req.body.Description
	};
	const moduleType = await HrModuleType.create(hrModuleType);
	if (moduleType) {
		return ({ status: 200, message: 'Success', data: moduleType });
	}
	else {
		return ({ status: 500, message: 'Error while saving record' });
	}
};

exports.findAllHrModuleType = async (req, res) => {
	const finddata = await getAllHrModuleType;
	if (finddata) {
		return ({ status: 200, message: 'Success', data: finddata });
	}
};

exports.createHrSeparationStatus = async (req, res) => {
	if (!req.body.Description) {
		return ({ status: 400,
			message: "Content can not be empty!"
		});
		return;
	}
	const hrSeparationStatus = {
		Description: req.body.Description
	};
	const separationType = await HrSeparationStatus.create(hrSeparationStatus);
	if (separationType) {
		return ({ status: 200, message: 'Success', data: separationType });
	}
	else {
		return ({ status: 500, message: 'Error while saving record' });
	}
};

exports.findAllHrSeparationStatus = async (req, res) => {
	const finddata = await getAllHrSeparationStatus;
	if (finddata) {
		return ({ status: 200, message: 'Success', data: finddata });
	}
};

exports.createJobCategory = async (req, res) => {
	if (!req.body.Description) {
		return ({ status: 400,
			message: "Content can not be empty!"
		});
		return;
	}
	const jobCategory = {
		Description: req.body.Description
	};
	const jc = await JobCategory.create(jobCategory);
	if (jc) {
		return ({ status: 200, message: 'Success', data: jc });
	}
	else {
		return ({ status: 500, message: 'Error while saving record' });
	}
};

exports.findAllJobCategory = async (req, res) => {
	const finddata = await getAllJobCategory;
	if (finddata) {
		return ({ status: 200, message: 'Success', data: finddata });
	}
    else{
        return ({status: 500, message: 'record not found'})
    }
};

exports.createLeaveRequestType = async (req, res) => {
	if (!req.body.Description) {
		return ({ status: 400,
			message: "Content can not be empty!"
		});
		return;
	}
	const leaveRequestType = {
		Request_Type_Name: req.body.Description
	};
	const lrt = await LeaveRequestType.create(leaveRequestType);
	if (lrt) {
		return ({ status: 200, message: 'Success', data: lrt });
	}
	else {
		return ({ status: 500, message: 'Error while saving record' });
	}
};

exports.findAllLeaveRequestType = async (req, res) => {
	const finddata = await getAllLeaveRequestType;
	if (finddata) {
		return ({ status: 200, message: 'Success', data: finddata });
	}
};

exports.createLocation = async (req, res) => {
	if (!req.body.Description) {
		return ({ status: 400,
			message: "Content can not be empty!"
		});
		return;
	}
	const location = {
		Company_Id: req.body.companyId,
		LocationName: req.body.Description
	};
	const loc = await Location.create(location);
	if (loc) {
		return ({ status: 200, message: 'Success', data: loc });
	}
	else {
		return ({ status: 500, message: 'Error while saving record' });
	}
};

exports.findAllLocation = async (req, res) => {
	const finddata = await getAllLocation();
	if (finddata) {
		return ({ status: 200, message: 'Success', data: finddata });
	}
    else{
		return ({ status: 500, message: 'Unsuccess: record not found', data: {} });
	}
};

exports.findLocationByCompanyId = async (req, res) => {
	const finddata = await Location.findAll({where: {
		Company_Id: req.body.companyId
	}});
	if (finddata) {
		return ({ status: 200, message: 'Success', data: finddata });
	}
    else{
		return ({ status: 500, message: 'Unsuccess: record not found', data: {} });
	}
};

exports.findAllNoticePeriodType = async (req, res) => {
	const finddata = await getAllNoticePeriodType;
	if (finddata) {
		return ({ status: 200, message: 'Success', data: finddata });
	}
    else{
		return ({ status: 500, message: 'Unsuccess: record not found', data: {} });
	}
};

exports.createQualification = async (req, res) => {
	if (!req.body.Description) {
		return ({status:400,
			message: "Content can not be empty!"
		});
		return;
	}
	const qualification = {
		Description: req.body.Description
	};
	const quali = await Qualification.create(qualification);
	if (quali) {
		return ({ status: 200, message: 'Success', data: quali });
	}
	else {
		return ({ status: 500, message: 'Error while saving record' });
	}
};

exports.findAllQualification = async (req, res) => {
	const finddata = await getAllQualification;
	if (finddata) {
		return ({ status: 200, message: 'Success', data: finddata });
	}
    else{
		return ({ status: 500, message: 'Unsuccess: record not found', data: {} });
	}
};

exports.createReason = async (req, res) => {
	if (!req.body.Description) {
		return ({status:400,
			message: "Content can not be empty!"
		});
		return;
	}
	const reason = {
		Description: req.body.Description
	};
	const reas = await Reason.create(reason);
	if (reas) {
		return ({ status: 200, message: 'Success', data: reas });
	}
	else {
		return ({ status: 500, message: 'Error while saving record' });
	}
};

exports.findAllReason = async (req, res) => {
	const finddata = await getAllReason;
	if (finddata) {
		return ({ status: 200, message: 'Success', data: finddata });
	}
    else{
		return ({ status: 500, message: 'Unsuccess: record not found', data: {} });
	}
};

exports.createRelationship = async (req, res) => {
	if (!req.body.Description) {
		return ({status:400,
			message: "Content can not be empty!"
		});
		return;
	}
	const relationship = {
		Description: req.body.Description
	};
	const relation = await Relationship.create(relationship);
	if (relation) {
		return ({ status: 200, message: 'Success', data: relation });
	}
	else {
		return ({ status: 500, message: 'Error while saving record' });
	}
};

exports.findAllRelationship = async (req, res) => {
	const finddata = await getAllRelationship;
	if (finddata) {
		return ({ status: 200, message: 'Success', data: finddata });
	}
    else{
		return ({ status: 500, message: 'Unsuccess: record not found', data: {} });
	}
};

exports.createRequestStatus = async (req, res) => {
	if (!req.body.Description) {
		return ({status:400,
			message: "Content can not be empty!"
		});
		return;
	}
	const requestStatus = {
		RequestTitle: req.body.Description
	};
	const rs = await RequestStatus.create(requestStatus);
	if (rs) {
		return ({ status: 200, message: 'Success', data: rs });
	}
	else {
		return ({ status: 500, message: 'Error while saving record' });
	}
};

exports.findAllRequestStatus = async (req, res) => {
	const finddata = await getAllRequestStatus;
	if (finddata) {
		return ({ status: 200, message: 'Success', data: finddata });
	}
    else{
		return ({ status: 500, message: 'Unsuccess: record not found', data: {} });
	}
};

exports.createRequisitionNumber = async (req, res) => {
	if (!req.body.Description) {
		return ({ status: 400,
			message: "Content can not be empty!"
		});
		return;
	}
	const requisitionNumber = {
		Description: req.body.Description
	};
	const rn = await RequisitionNumber.create(requisitionNumber);
	if (rn) {
		return ({ status: 200, message: 'Success', data: rn });
	}
	else {
		return ({ status: 500, message: 'Error while saving record' });
	}
};

exports.findAllRequisitionNumber = async (req, res) => {
	const finddata = await getAllRequisitionNumber;
	if (finddata) {
		return ({ status: 200, message: 'Success', data: finddata });
	}
    else{
		return ({ status: 500, message: 'Unsuccess: record not found', data: {} });
	}
};

exports.createTerminationType = async (req, res) => {
	if (!req.body.Description) {
		return ({status: 400,
			message: "Content can not be empty!"
		});
		return;
	}
	const terminationType = {
		Description: req.body.Description
	};
	const tt = await TerminationType.create(terminationType);
	if (tt) {
		return ({ status: 200, message: 'Success', data: tt });
	}
	else {
		return ({ status: 500, message: 'Error while saving record' });
	}
};

exports.findAllTerminationType = async (req, res) => {
	const finddata = await getAllTerminationType;
	if (finddata) {
		return ({ status: 200, message: 'Success', data: finddata });
	}
    else{
		return ({ status: 500, message: 'Unsuccess: record not found', data: {} });
	}
};

exports.createGender = async (req, res) => {
	if (!req.body.GenderName) {
		return ({status:400,
			message: "Content can not be empty!"
		});
		return;
	}
	const gender = {
		GenderName: req.body.Description
	};
	const g = await Gender.create(gender);
	if (g) {
		return ({ status: 200, message: 'Success', data: g });
	}
	else {
		return ({ status: 500, message: 'Error while saving record' });
	}
};

exports.findAllGender = async (req, res) => {
	const finddata = await getAllGender();
	if (finddata) {
		return ({ status: 200, message: 'Success', data: finddata });
	}
    else{
		return ({ status: 500, message: 'Unsuccess: record not found', data: {} });
	}
};

exports.createTimezone = async (req, res) => {
	if (!req.body.Description) {
		return ({status: 400,
			message: "Content can not be empty!"
		});
		return;
	}
	const timezone = {
		TimezoneName: req.body.Description
	};
	const tz = await Timezone.create(timezone);
	if (tz) {
		return ({ status: 200, message: 'Success', data: tz });
	}
	else {
		return ({ status: 500, message: 'Error while save record' });
	}
};

exports.findAllTimezone = async (req, res) => {
	const finddata = await getAllTimezone();
	if (finddata) {
		return ({ status: 200, message: 'Success', data: finddata });
	}
    else{
		return ({ status: 500, message: 'Unsuccess: record not found', data: {} });
	}
};

exports.getAllTimezone = async (req, res) => {
	const finddata = await getAllTimezone();

	if (finddata) {
		return ({ status: 200, message: 'Success', data: finddata });
	}
	else{
		return ({ status: 500, message: 'Unsuccess: record not found', data: {} });
	}
};

exports.getAllHrLookUps = async (req, res) => {
	let company = await getAllCompany();
	let group = await getAllGroup();
	let location = await getAllLocation();
	let companydomain = await getAllCompanyDomain();
	
	let businessUnit = await getAllBusinessUnit();
	let department = await getAllDepartment();
	let campaign = await getAllCampaign();
	let jobcategory = await getAllJobCategory();
	let designation = await getAllDesignation();
	let costcenter = await getAllCostCenter();

	let hrmoduletype = await getAllHrModuleType();

	let leaverequesttype = await getAllLeaveRequestType();
	let reason = await getAllReason();
	let relationship = await getAllRelationship();
	let requeststatus = await getAllRequestStatus();
	let gender = await getAllGender();
	let timezone = await getAllTimezone();
	let qualification = await getAllQualification()
	return ({
		status: 200, message: 'Success', group, location, businessUnit, companydomain,
		businessUnit, department, campaign, jobcategory, designation, costcenter, hrmoduletype,
		leaverequesttype, reason, relationship, requeststatus, gender, timezone, qualification, company
	});
}

function getAllCompany() {
	return Company.findAll();
}

function getAllBusinessUnit() {
	return BusinessUnit.findAll();
}
function getAllCampaign() {
	return Campaign.findAll();
}
function getAllCompanyDomain() {
	return CompanyDomain.findAll();
}

function getAllCostCenter() {
	return CostCenter.findAll();
}
function getAllDepartment() {
	return Department.findAll();
}
function getAllDesignation() {
	return Designation.findAll();
}
function getAllGroup() {
	return Group.findAll();
}
function getAllHrModuleType() {
	return HrModuleType.findAll();
}
function getAllHrSeparationStatus() {
	return HrSeparationStatus.findAll();
}
function getAllJobCategory() {
	return JobCategory.findAll();
}
function getAllLeaveRequestType() {
	return LeaveRequestType.findAll();
}
function getAllLocation() {
	return Location.findAll();
}

function getAllQualification() {
	return Qualification.findAll();
}
function getAllReason() {
	return Reason.findAll();
}
function getAllRelationship() {
	return Relationship.findAll();
}
function getAllRequestStatus() {
	return RequestStatus.findAll();
}
function getAllRequisitionNumber() {
	return RequisitionNumber.findAll();
}
function getAllTerminationType() {
	return TerminationType.findAll();
}
function getAllGender() {
	return Gender.findAll();
}
function getAllTimezone() {
	return Timezone.findAll();
}
