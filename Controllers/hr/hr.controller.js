const { QueryTypes } = require('sequelize');
const { posts, sequelize } = require("../../models");
const dateformatehelper = require('../../helpers/datehelper');
const timeZoneType = require('../../helpers/TimeZoneTypes');
const db = require("../../models");
var moment = require('moment')
const path = require('path');

const Company = db.companyDetail;
const FamilyInformation = db.familyInformation;
const Experience = db.experience;
const DocumentUpload = db.documentUpload;
const BankDetail = db.bankDetail;
const Academic = db.academic;
const ProfessionalReference = db.professionalReference;
const ContactDetails = db.contactDetails;
const PersonalDetails = db.personalDetails;
const LifeInsurance = db.lifeInsurance;

const TimeAdjustment = db.timeAdjustment;
const EmployeeLeave = db.employeeLeave;
const LeaveRequest = db.leaveRequest;
const UserCalendar = db.userCalendar;
const CalendarMonthDetail = db.calendarMonthDetail;
const HrShift = db.hrShift;
const ShiftWeekDetail = db.shiftWeekDetail;
const UserShiftLink = db.userShiftLink;
const DeptShiftLink = db.deptShiftLink;
const ClockInOut = db.clockInOut;

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

const Op = db.Sequelize.Op;

async function checkIfEmployeeIdExist(filter) {
	const finddata = await PersonalDetails.findOne(filter);

	return finddata ? finddata : false;
}

exports.createPersonalDetails = async (req, res) => {
	try {

		const { employeeId } = req.body;
		if (!employeeId) {
			res.status(400).send({
				message: "Content can not be empty!"
			});
			return;
		}
		let filter = {
			where: {
				[Op.or]: [
					{ EmployeeId: employeeId },
					{ User_Profile_Id: req.body.userProfileId }
				  ]
			}

		}
		let isEmployeeExist = await checkIfEmployeeIdExist(filter);
		if (isEmployeeExist != false) {
			return res.send({ status: 0, message: 'Employee Id Already Exist' });
		}

		const personalDetails = {
			User_Profile_Id: req.session.userProfile.data.id,
			EmployeeId: req.body.employeeId,
			FirstName: req.body.firstName,
			MiddleName: req.body.middleName,
			LastName: req.body.lastName,
			Guardian_Name: req.body.guardianName,
			Phone: req.body.phone,
			DateOfBirth: req.body.dateOfBirth,
			DateOfJoining: req.body.dateOfJoining,
			Gender_Id: req.body.genderId,
			Email: req.body.email,
			IdentityNumber: req.body.identityNumber,
			createdAt: dateformatehelper.convertdatetoothertimezone(new Date(), req.session.userProfile.data.Timezone)
		};
		console.log(req.body,420);
		const pd = await PersonalDetails.create(personalDetails);
		if (pd) {
			res.send({ status: 1, message: 'Success', data: pd });
		}
		else {
			res.send({ status: 0, message: 'Error' });
		}
	}
	catch (err) {
		return res.status(400).send(err);
	}
};

exports.updatePersonalDetails = async (req, res) => {
	try {
		if (!req.body.employeeId) {
			res.status(400).send({
				message: "Content can not be empty!"
			});
			return;
		}

		const personalDetails = {
			User_Profile_Id: req.session.userProfile.data.id,
			EmployeeId: req.body.employeeId,
			FirstName: req.body.firstName,
			MiddleName: req.body.middleName,
			LastName: req.body.lastName,
			Guardian_Name: req.body.guardianName,
			Phone: req.body.phone,
			DateOfBirth: req.body.dateOfBirth,
			DateOfJoining: req.body.dateOfJoining,
			Gender_Id: req.body.genderId,
			Email: req.body.email,
			IdentityNumber: req.body.identityNumber,
			updatedAt: dateformatehelper.convertdatetoothertimezone(new Date(), req.session.userProfile.data.Timezone)
		};

		const pd = await PersonalDetails.update(personalDetails, {
			where: {
				id: req.body.personalDetailId
			}
		});
		if (pd) {
			res.send({ status: 1, message: 'Success', data: pd });
		}
		else {
			res.send({ status: 0, message: 'Error' });
		}
	}
	catch (err) {
		res.status(400).send(err);
	}
};

exports.findPersonalDetailsByEmployeeId = async (req, res) => {
	let filter = {
		where: { EmployeeId: req.body.employeeId },
		include: [{ model: Gender }, { model: Company, include: [Designation] }]
	}
	const finddata = await checkIfEmployeeIdExist(filter)
	if (finddata) {
		res.send({ status: 1, message: 'Success', data: finddata });
	} else {
		res.send({ status: 0, message: 'Unsuccess', data: [] });
	}
};

exports.findPersonalDetailsByUserProfileId = async (req, res) => {
	let filter = {
		where: { User_Profile_Id: req.body.userProfileId }
	}
	const finddata = await checkIfEmployeeIdExist(filter)
	if (finddata) {
		res.send({ status: 1, message: 'Success', data: finddata });
	} else {
		res.send({ status: 0, message: 'Unsuccess', data: [] });
	}
};

exports.findAllPersonalDetails = async (req, res) => {
	const finddata = await PersonalDetails.findAll({ include: [{ model: Gender }, { model: Company, include: [Designation] }] });
	if (finddata) {
		res.send({ status: 1, message: 'Success', data: finddata });
	} else {
		res.send({ status: 0, message: 'Unsuccess', data: [] });
	}
};

exports.createCompany = async (req, res) => {
	try {
		if (!req.body.groupId) {
			res.status(400).send({
				message: "Content can not be empty!"
			});
			return;
		}

		const company = {
			Personal_Detail_Id: req.body.personalDetailId,
			Group_Id: req.body.groupId,
			Location_Id: req.body.locationId,
			Company_Domain_Id: req.body.companyDomainId,
			Business_Unit_Id: req.body.businessUnitId,
			Department_Id: req.body.departmentId,
			Job_Category_Id: req.body.jobCategoryId,
			Designation_Id: req.body.designationId,
			Campaign_Id: req.body.campaignId,
			Requisition_Id: req.body.requisitionId,
			CreatedBy: req.body.userProfileId,
			CreatedAt: dateformatehelper.convertdatetoothertimezone(new Date(), req.session.userProfile.data.Timezone)
		};

		const com = await Company.create(company);
		if (com) {
			res.send({ status: 1, message: 'Success', data: com });
		}
		else {
			res.send({ status: 0, message: 'Error' });
		}
	}
	catch (err) {
		res.status(400).send(err);
	}
};

exports.updateCompany = async (req, res) => {

	try {

		if (!req.body.personalDetailId) {
			res.status(400).send({
				message: "Content can not be empty!"
			});
			return;
		}

		const company = {
			Personal_Detail_Id: req.body.personalDetailId,
			Group_Id: req.body.groupId,
			Location_Id: req.body.locationId,
			Company_Domain_Id: req.body.companyDomainId,
			Business_Unit_Id: req.body.businessUnitId,
			Department_Id: req.body.departmentId,
			Job_Category_Id: req.body.jobCategoryId,
			Designation_Id: req.body.designationId,
			Campaign_Id: req.body.campaignId,
			Requisition_Id: req.body.requisitionId,
			UpdatedAt: dateformatehelper.convertdatetoothertimezone(new Date(), req.session.userProfile.data.Timezone)
		};

		const com = await Company.update(company, {
			where: {
				id: req.body.id
			}
		});
		if (com) {
			res.send({ status: 1, message: 'Success', data: com });
		}
		else {
			res.send({ status: 0, message: 'Error' });
		}
	}
	catch (err) {
		res.status(400).send(err);
	}
};

exports.findCompanyByUserProfileId = async (req, res) => {
	const finddata = await Company.findOne({ where: { Personal_Detail_Id: req.body.personalDetailId } });
	if (finddata) {
		res.send({ status: 1, message: 'Success', data: finddata });
	} else {
		res.send({ status: 0, message: 'Unsuccess', data: [] });
	}
};

exports.createFamilyInformation = async (req, res) => {
	try {
		if (!req.body.personalDetailId) {
			res.status(400).send({
				message: "Content can not be empty!"
			});
			return;
		}

		const familyInformation = {
			Personal_Detail_Id: req.body.personalDetailId,
			MemberName: req.body.memberName,
			Relationship_Id: req.body.relationshipId,
			DateOfBirth: req.body.dateOfBirth,
			Qualification_Id: req.body.qualification,
			CreatedBy: req.body.userProfileId,
			CreatedAt: dateformatehelper.convertdatetoothertimezone(new Date(), req.session.userProfile.data.Timezone)
		};

		const fi = await FamilyInformation.create(familyInformation);
		if (fi) {
			res.send({ status: 1, message: 'Success', data: fi });
		}
		else {
			res.send({ status: 0, message: 'Error' });
		}
	}
	catch (err) {
		res.status(400).send(err);
	}
};

exports.updateFamilyInformation = async (req, res) => {
	try {
		if (!req.body.personalDetailId) {
			res.status(400).send({
				message: "Content can not be empty!"
			});
			return;
		}

		const familyInformation = {
			Personal_Detail_Id: req.body.personalDetailId,
			MemberName: req.body.memberName,
			Relationship_Id: req.body.relationshipId,
			DateOfBirth: req.body.dateOfBirth,
			Qualification_Id: req.body.qualification,
			UpdatedAt: dateformatehelper.convertdatetoothertimezone(new Date(), req.session.userProfile.data.Timezone)
		};

		const fi = await FamilyInformation.update(familyInformation, {
			where: {
				id: req.body.id
			}
		});
		if (fi) {
			res.send({ status: 1, message: 'Success', data: fi });
		}
		else {
			res.send({ status: 0, message: 'Error' });
		}
	}
	catch (err) {
		res.status(400).send(err);
	}
};

exports.findFamilyInformationByUserProfileId = async (req, res) => {
	const finddata = await FamilyInformation.findOne({
		include: [{ model: Relationship }, { model: Qualification }],
		where: { Personal_Detail_Id: req.body.personalDetailId }
	});
	if (finddata) {
		res.send({ status: 1, message: 'Success', data: finddata });
	} else {
		res.send({ status: 0, message: 'Unsuccess', data: [] });
	}
};

exports.createExperience = async (req, res) => {
	try {
		if (!req.body.personalDetailId) {
			res.status(400).send({
				message: "Content can not be empty!"
			});
			return;
		}

		const experience = {
			Personal_Detail_Id: req.body.personalDetailId,
			CompanyName: req.body.companyName,
			FromYear: req.body.fromyear,
			ToYear: req.body.toyear,
			Designation_Id: req.body.designationId,
			Details: req.body.details,
			CreatedBy: req.body.userProfileId,
			CreatedAt: dateformatehelper.convertdatetoothertimezone(new Date(), req.session.userProfile.data.Timezone)
		};

		const exp = await Experience.create(experience);
		if (exp) {
			res.send({ status: 1, message: 'Success', data: exp });
		}
		else {
			res.send({ status: 0, message: 'Error' });
		}
	}
	catch (err) {
		res.status(400).send(err);
	}
};

exports.updateExperience = async (req, res) => {
	try {
		if (!req.body.personalDetailId) {
			res.status(400).send({
				message: "Content can not be empty!"
			});
			return;
		}

		const experience = {
			Personal_Detail_Id: req.body.personalDetailId,
			CompanyName: req.body.companyName,
			FromYear: req.body.fromyear,
			ToYear: req.body.toyear,
			Designation_Id: req.body.designationId,
			Details: req.body.details,
			UpdatedAt: dateformatehelper.convertdatetoothertimezone(new Date(), req.session.userProfile.data.Timezone)
		};

		const exp = await Experience.update(experience, {
			where: {
				id: req.body.id
			}
		});
		if (exp) {
			res.send({ status: 1, message: 'Success', data: exp });
		}
		else {
			res.send({ status: 0, message: 'Error' });
		}
	}
	catch (err) {
		res.status(400).send(err);
	}
};

exports.findExperienceByUserProfileId = async (req, res) => {
	const finddata = await Experience.findOne({
		include: [{ model: Designation }],
		where: { Personal_Detail_Id: req.body.personalDetailId }
	});
	if (finddata) {
		res.send({ status: 1, message: 'Success', data: finddata });
	} else {
		res.send({ status: 0, message: 'Unsuccess', data: [] });
	}
};

exports.createAcademic = async (req, res) => {
	try {
		if (!req.body.institudeName) {
			res.status(400).send({
				message: "Content can not be empty!"
			});
			return;
		}
		const acadamic = {
			Personal_Detail_Id: req.body.personalDetailId,
			InstitudeName: req.body.institudeName,
			Degree_Title: req.body.degree,
			Grade: req.body.grade,
			Year_Passed: req.body.yearPassed,
			CreatedBy: req.body.userProfileId,
			CreatedAt: dateformatehelper.convertdatetoothertimezone(new Date(), req.session.userProfile.data.Timezone)
		};

		const aca = await Academic.create(acadamic);
		if (aca) {
			res.send({ status: 1, message: 'Success', data: aca });
		}
		else {
			res.send({ status: 0, message: 'Error' });
		}
	}
	catch (err) {
		res.status(400).send(err);
	}
};

exports.updateAcademic = async (req, res) => {
	try {
		if (!req.body.personalDetailId) {
			res.status(400).send({
				message: "Content can not be empty!"
			});
			return;
		}

		const academic = {
			Personal_Detail_Id: req.body.personalDetailId,
			InstitudeName: req.body.institudeName,
			Degree_Title: req.body.degree,
			Grade: req.body.grade,
			Year_Passed: req.body.yearPassed,
			UpdatedAt: dateformatehelper.convertdatetoothertimezone(new Date(), req.session.userProfile.data.Timezone)
		};
		const aca = await Academic.update(academic, {
			where: {
				id: req.body.id
			}
		});
		if (aca) {
			res.send({ status: 1, message: 'Success', data: aca });
		}
		else {
			res.send({ status: 0, message: 'Error' });
		}
	}
	catch (err) {
		res.status(400).send(err);
	}
};

exports.findAcademicByUserProfileId = async (req, res) => {
	const finddata = await Academic.findAll({ where: { Personal_Detail_Id: req.body.personalDetailId } });
	if (finddata) {
		res.send({ status: 1, message: 'Success', data: finddata });
	} else {
		res.send({ status: 0, message: 'Unsuccess', data: [] });
	}
};

exports.createProfessionalReference = async (req, res) => {
	try {
		if (!req.body.name) {
			res.status(400).send({
				message: "Content can not be empty!"
			});
			return;
		}

		const professionalReference = {
			Personal_Detail_Id: req.body.personalDetailId,
			Name: req.body.name,
			Relationship_Id: req.body.relationshipId,
			Designation_Id: req.body.designationId,
			Number: req.body.number,
			Company_Name: req.body.companyName,
			CreatedBy: req.body.userProfileId,
			CreatedAt: dateformatehelper.convertdatetoothertimezone(new Date(), req.session.userProfile.data.Timezone)
		};

		const pr = await ProfessionalReference.create(professionalReference);
		if (pr) {
			res.send({ status: 1, message: 'Success', data: pr });
		}
		else {
			res.send({ status: 0, message: 'Error' });
		}
	}
	catch (err) {
		res.status(400).send(err);
	}
};

exports.updateProfessionalReference = async (req, res) => {
	try {
		if (!req.body.name) {
			res.status(400).send({
				message: "Content can not be empty!"
			});
			return;
		}

		const professionalReference = {
			Personal_Detail_Id: req.body.personalDetailId,
			Name: req.body.name,
			Relationship_Id: req.body.relationshipId,
			Designation_Id: req.body.designationId,
			Number: req.body.number,
			Company_Name: req.body.companyName,
			UpdatedAt: dateformatehelper.convertdatetoothertimezone(new Date(), req.session.userProfile.data.Timezone)
		};
		const pr = await ProfessionalReference.update(professionalReference, {
			where: {
				id: req.body.id
			}
		});
		if (pr) {
			res.send({ status: 1, message: 'Success', data: pr });
		}
		else {
			res.send({ status: 0, message: 'Error' });
		}
	}
	catch (err) {
		res.status(400).send(err);
	}
};

exports.findProfessionalReferenceByUserProfileId = async (req, res) => {
	const finddata = await ProfessionalReference.findAll({
		include: [{ model: Relationship }, { model: Designation }],
		where: { Personal_Detail_Id: req.body.personalDetailId }
	});
	if (finddata) {
		res.send({ status: 1, message: 'Success', data: finddata });
	} else {
		res.send({ status: 0, message: 'Unsuccess', data: [] });
	}
};

exports.createContactDetails = async (req, res) => {
	try {
		if (!req.body.name) {
			res.status(400).send({
				message: "Content can not be empty!"
			});
			return;
		}

		const contactDetails = {
			Personal_Detail_Id: req.body.personalDetailId,
			Name: req.body.name,
			Relationship_Id: req.body.relationshipId,
			Number: req.body.number,
			Company_Name: req.body.companyName,
			CreatedBy: req.body.userProfileId,
			CreatedAt: dateformatehelper.convertdatetoothertimezone(new Date(), req.session.userProfile.data.Timezone)
		};

		const cd = await ContactDetails.create(contactDetails);
		if (cd) {
			res.send({ status: 1, message: 'Success', data: cd });
		}
		else {
			res.send({ status: 0, message: 'Error' });
		}
	}
	catch (err) {
		res.status(400).send(err);
	}
};

exports.updateContactDetails = async (req, res) => {
	try {
		if (!req.body.name) {
			res.status(400).send({
				message: "Content can not be empty!"
			});
			return;
		}

		const contactDetails = {
			Personal_Detail_Id: req.body.personalDetailId,
			Name: req.body.name,
			Relationship_Id: req.body.relationshipId,
			Number: req.body.number,
			Company_Name: req.body.companyName,
			UpdatedAt: dateformatehelper.convertdatetoothertimezone(new Date(), req.session.userProfile.data.Timezone)
		};
		const cd = await ContactDetails.update(contactDetails, {
			where: {
				id: req.body.id
			}
		});
		if (cd) {
			res.send({ status: 1, message: 'Success', data: cd });
		}
		else {
			res.send({ status: 0, message: 'Error' });
		}
	}
	catch (err) {
		res.status(400).send(err);
	}
};

exports.findContactDetailsByUserProfileId = async (req, res) => {
	const finddata = await ContactDetails.findAll({
		include: [{ model: Relationship }],
		where: { Personal_Detail_Id: req.body.personalDetailId }
	});
	if (finddata) {
		res.send({ status: 1, message: 'Success', data: finddata });
	} else {
		res.send({ status: 0, message: 'Unsuccess', data: [] });
	}
};

exports.createDocumentUpload = async (req, res) => {
	try {
		var doc = [];
		if (!req.body.personalDetailId) {
			res.status(400).send({
				message: "Content can not be empty!"
			});
			return;
		}
		req.body.fileName.forEach(async element => {

			const documentUpload = {
				Personal_Detail_Id: req.body.personalDetailId,
				Hr_Module_Type_Id: req.body.moduleId,
				Document_Path: req.body.path,
				Document_Name: element,
				Document_Extension: path.extname(element),
				Comment: req.body.comment == null ? "" : req.body.comment,
				Description: req.body.description == null ? "" : req.body.description,
				CreatedBy: req.body.createdBy,
				CreatedAt: dateformatehelper.convertdatetoothertimezone(new Date(), req.session.userProfile.data.Timezone)
			};
			doc.push(await DocumentUpload.create(documentUpload));
		});

		if (doc) {
			res.send({ status: 1, message: 'Success', data: doc });
		}
		else {
			res.send({ status: 0, message: 'Error' });
		}
	}
	catch (err) {
		res.status(400).send(err);
	}
};

exports.updateDocumentUpload = async (req, res) => {
	try {
		if (!req.body.personalDetailId) {
			res.status(400).send({
				message: "Content can not be empty!"
			});
			return;
		}

		const documentUpload = {
			Personal_Detail_Id: req.body.personalDetailId,
			Hr_module_Type_Id: req.body.moduleId,
			Document_Path: req.body.documentPath,
			Comment: req.body.comment,
			Description: req.body.description,
			UpdatedAt: dateformatehelper.convertdatetoothertimezone(new Date(), req.session.userProfile.data.Timezone)
		};

		const doc = await DocumentUpload.update(documentUpload, {
			where: {
				id: req.body.id
			}
		});
		if (doc) {
			res.send({ status: 1, message: 'Success', data: doc });
		}
		else {
			res.send({ status: 0, message: 'Error' });
		}
	}
	catch (err) {
		res.status(400).send(err);
	}
};

exports.findDocumentUploadByUserProfileId = async (req, res) => {
	const finddata = await DocumentUpload.findAll({
		include: [{ model: HrModuleType }],
		where: { Personal_Detail_Id: req.body.personalDetailId }
	});
	if (finddata) {
		res.send({ status: 1, message: 'Success', data: finddata });
	}
	else {
		res.send({ status: 0, message: 'Unsuccess', data: [] });
	}
};

exports.createBankDetail = async (req, res) => {
	try {
		if (!req.body.personalDetailId) {
			res.status(400).send({
				message: "Content can not be empty!"
			});
			return;
		}

		const bankDetail = {
			Personal_Detail_Id: req.body.personalDetailId,
			Iban: req.body.iban,
			Bic: req.body.bic,
			Title: req.body.title,
			BankName: req.body.bankName,
			BranchName: req.body.branchName,
			CreatedBy: req.body.userProfileId,
			CreatedAt: dateformatehelper.convertdatetoothertimezone(new Date(), req.session.userProfile.data.Timezone)
		};

		const bd = await BankDetail.create(bankDetail);
		if (bd) {
			res.send({ status: 1, message: 'Success', data: bd });
		}
		else {
			res.send({ status: 0, message: 'Error' });
		}
	}
	catch (err) {
		res.status(400).send(err);
	}
};

exports.updateBankDetail = async (req, res) => {
	try {
		if (!req.body.personalDetailId) {
			res.status(400).send({
				message: "Content can not be empty!"
			});
			return;
		}

		const bankDetail = {
			Personal_Detail_Id: req.body.personalDetailId,
			Iban: req.body.iban,
			Bic: req.body.bic,
			Title: req.body.title,
			BankName: req.body.bankName,
			BranchName: req.body.branchName,
			UpdatedAt: dateformatehelper.convertdatetoothertimezone(new Date(), req.session.userProfile.data.Timezone)
		};

		const bd = await BankDetail.update(bankDetail, {
			where: {
				id: req.body.id
			}
		});
		if (bd) {
			res.send({ status: 1, message: 'Success', data: bd });
		}
		else {
			res.send({ status: 0, message: 'Error' });
		}
	}
	catch (err) {
		res.status(400).send(err);
	}
};

exports.findBankDetailByUserProfileId = async (req, res) => {
	const finddata = await BankDetail.findOne({ where: { Personal_Detail_Id: req.body.personalDetailId } });
	if (finddata) {
		res.send({ status: 1, message: 'Success', data: finddata });
	} else {
		res.send({ status: 0, message: 'Unsuccess', data: [] });
	}
};

exports.createLifeInsurance = async (req, res) => {
	try {
		if (!req.body.personalDetailId) {
			res.status(400).send({
				message: "Content can not be empty!"
			});
			return;
		}

		const lifeInsurance = {
			Personal_Detail_Id: req.body.personalDetailId,
			Insurance_Provider: req.body.insuranceProvider,
			Policy_Number: req.body.policyNumber,
			Start_Date: req.body.startDate,
			End_Date: req.body.endDate,
			Coverage_Details: req.body.coverageDtails,
      Comment: req.body.otherInfo,
			CreatedBy: req.body.userProfileId,
			CreatedAt: dateformatehelper.convertdatetoothertimezone(new Date(), req.session.userProfile.data.Timezone)
		};

		const li = await LifeInsurance.create(lifeInsurance);
		if (li) {
			res.send({ status: 1, message: 'Success', data: li });
		}
		else {
			res.send({ status: 0, message: 'Error' });
		}
	}
	catch (err) {
		res.status(400).send(err);
	}
};

exports.updateLifeInsurance = async (req, res) => {
	try {
		if (!req.body.personalDetailId) {
			res.status(400).send({
				message: "Content can not be empty!"
			});
			return;
		}

		const lifeInsurance = {
			Personal_Detail_Id: req.body.personalDetailId,
      Insurance_Provider: req.body.insuranceProvider,
			Policy_Number: req.body.policyNumber,
			Start_Date: req.body.startDate,
			End_Date: req.body.endDate,
			Coverage_Details: req.body.coverageDtails,
      Comment: req.body.otherInfo,
			UpdatedAt: dateformatehelper.convertdatetoothertimezone(new Date(), req.session.userProfile.data.Timezone)
		};

		const li = await LifeInsurance.update(lifeInsurance, {
			where: {
				id: req.body.id
			}
		});
		if (li) {
			res.send({ status: 1, message: 'Success', data: li });
		}
		else {
			res.send({ status: 0, message: 'Error' });
		}
	}
	catch (err) {
		res.status(400).send(err);
	}
};

exports.findLifeInsuranceByUserProfileId = async (req, res) => {
	const finddata = await LifeInsurance.findOne({ where: { Personal_Detail_Id: req.body.personalDetailId } });
	if (finddata) {
		res.send({ status: 1, message: 'Success', data: finddata });
	} else {
		res.send({ status: 0, message: 'Unsuccess', data: [] });
	}
};

exports.createTimeAdjustmentRequest = async (req, res) => {
	try {
		if (!req.body.reasonId) {
			res.status(400).send({
				message: "Content can not be empty!"
			});
			return;
		}
		const timeAdjustment = {
			Original_Time: req.body.originalTime,
			Requested_Time: req.body.requestTime,
			Comment: req.body.comment,
			Status_Id: req.body.statusId,
			ManageOn: req.body.manageOn,
			ManageBy: req.body.manageBy,
			Manager_Comment: req.body.managerComment,
			Reason_Id: req.body.reasonId,
			CreatedBy: req.body.personalDetailId,
			CreatedAt: dateformatehelper.convertdatetoothertimezone(new Date(), req.session.userProfile.data.Timezone)
		};

		const ta = await TimeAdjustment.create(timeAdjustment);

		if (ta) {
			res.send({ status: 1, message: 'Success', data: ta });
		}
		else {
			res.send({ status: 0, message: 'Error' });
		}
	}
	catch (err) {
		res.status(400).send(err);
	}
};

exports.updateTimeAdjustmentRequest = async (req, res) => {
	try {
		if (!req.body.personalDetailId) {
			res.status(400).send({
				message: "Content can not be empty!"
			});
			return;
		}
		const timeAdjustment = {
			id: req.body.id,
			Original_Time: req.body.originalTime,
			Request_Time: req.body.requestTime,
			Comment: req.body.comment,
			Status_Id: req.body.statusId,
			ManageOn: req.body.manageOn,
			ManageBy: req.body.manageBy,
			Manager_Comment: req.body.managerComment,
			Reason_Id: req.body.reasonId,
			UpdatedAt: dateformatehelper.convertdatetoothertimezone(new Date(), req.session.userProfile.data.Timezone)
		};
		const ta = await TimeAdjustment.update(timeAdjustment, {
			where: {
				id: req.body.id
			}
		});
		if (com) {
			res.send({ status: 1, message: 'Success', data: ta });
		}
		else {
			res.send({ status: 0, message: 'Error' });
		}
	}
	catch (err) {
		res.status(400).send(err);
	}
};

exports.findTimeAdjustmentByUserProfileId = async (req, res) => {
	const finddata = await TimeAdjustment.findOne({ where: { CreatedBy: req.body.personalDetailId } });
	if (finddata) {
		res.send({ status: 1, message: 'Success', data: finddata });
	} else {
		res.send({ status: 0, message: 'Unsuccess', data: [] });
	}
};

exports.findAllTimeAdjustment = async (req, res) => {
	const finddata = await TimeAdjustment.findAll();
	if (finddata) {
		res.send({ status: 1, message: 'Success', data: finddata });
	} else {
		res.send({ status: 0, message: 'Unsuccess', data: [] });
	}
};

exports.createShift = async (req, res) => {
	try {
		if (!req.body.userProfileId && req.body.userProfileId <= 0) {
			res.status(400).send({
				message: "Content can not be empty!"
			});
			return;
		}
		var response = [];
		var shiftObj = [];
		var Weeks = [];

		const shiftRecord = {
			// Group_Id: req.body.groupId,
			// Company_Id: req.body.companyId,
			Shift_Name: req.body.name,
			Description: req.body.description,
			Timezone_Id: req.body.timezoneId,
			CreatedBy: req.body.userProfileId,
			CreatedAt: dateformatehelper.convertdatetoothertimezone(new Date(), req.session.userProfile.data.Timezone)
		};
		const shift = await HrShift.create(shiftRecord);
		// for (const dept of req.body.department){
		//     const deptShiftRecord = {
		//       Department_Id: dept.departmentid,
		//       Shift_Id: shift.id
		//     };
		//     const department = await DeptShiftLink.create(deptShiftRecord);

		//     response.push({
		//       "departmentid": dept.departmentid,
		//       "id": department.id
		//     });
		// };
		await shiftObj.push(
			{
				"Id": shift.id,
				// "Group_Id": shift.Group_Id,
				"Company_Id": shift.Company_Id,
				"Shift_Name": shift.Shift_Name,
				"Description": shift.Description,
				"CreatedBy": shift.CreatedBy
			});

		await response.push(shiftObj);

		if (shift) {
			res.send({ status: 1, message: 'Success', data: response });
		}
		else {
			res.send({ status: 0, message: 'Error' });
		}
	}
	catch (err) {
		console.log(err)
		res.status(400).send(err);
	}
};

exports.updateShiftRequest = async (req, res) => {
	try {
		if (!req.body.userProfileId && req.body.userProfileId <= 0 && req.body.id <= 0) {
			res.status(400).send({
				message: "Content can not be empty!"
			});
			return;
		}
		var response = [];

		const shiftRecord = {
			// Group_Id: req.body.groupId,
			// Company_Id: req.body.companyId,
			Shift_Name: req.body.name,
			Description: req.body.description,
			UpdatedAt: dateformatehelper.convertdatetoothertimezone(new Date(), req.session.userProfile.data.Timezone)
		};

		const shift = await HrShift.update(shiftRecord, {
			where: {
				id: req.body.id
			}
		});

		// for (const dept of req.body.department){
		//   const deptShiftRecord = {
		//     Department_Id: dept.departmentid,
		//     Shift_Id: shift.id
		//   };

		//   const department = await DeptShiftLink.findOne({where: { Shift_Id: req.body.shift.Id, Department_Id: dept.departmentid }});
		//   if(!department){
		//     const department = await DeptShiftLink.create(deptShiftRecord);
		//     response.push({
		//       "departmentid": dept.departmentid,
		//       "id": department.id
		//     });
		//   }      
		// };

		// let Weeks = [];
		// req.body.weeks.forEach(async week => {
		//   const weekdetail = {
		//     Id: week.Id,
		//     Shift_Id: shift.id,
		//     Day: week.day,
		//     StartTime: week.startTime,
		//     EndTime: week.endTime,
		//     BreakDuration: week.breakDuration,
		//     FlexiIn: week.flexiIn,
		//     FlexiOut: week.flexiOut
		//   };
		//   const wd = await ShiftWeekDetail.update(weekdetail,{where:{Id: week.Id}});
		//   Weeks.push(wd);
		// });
		//shift.push(Weeks);
		response.push(shift);
		if (shift) {
			res.send({ status: 1, message: 'Success', data: response });
		}
		else {
			res.send({ status: 0, message: 'Error' });
		}
	}
	catch (err) {
		res.status(400).send(err);
	}
};

exports.createShiftWeeks = async (req, res) => {
	try {
		if (!req.body.shiftId && req.body.shiftId === '0') {
			res.status(400).send({
				message: "Content can not be empty!"
			});
			return;
		}
		var response = [];
		var shiftObj = [];
		var Weeks = [];

		for (const week of req.body.weeks) {
			const weekdetail = {
				Shift_Id: req.body.shiftId,
				DayType: week.dayType,
				Day: week.day,
				StartTime: week.startTimeHour + ":"+week.startTimeMin,
				EndTime: week.endTimeHour + ":"+week.endTimeMin,
				BreakDuration: week.breakDurationHour + ":"+ week.breakDurationMin,
				FlexiIn: week.flexInHour + ":"+ week.flexInMin,
				FlexiOut: week.flexOutHour+ ":"+week.flexOutMin,
				CreatedBy: req.body.userProfileId,
				CreatedAt: dateformatehelper.convertdatetoothertimezone(new Date(), req.session.userProfile.data.Timezone)
			};
			const w = await ShiftWeekDetail.create(weekdetail);
			await Weeks.push({
				id: w.id,
				Shift_Id: w.Shift_Id,
				DayType: w.DayType,
				Day: w.Day,
				StartTime: w.StartTime,
				EndTime: w.EndTime,
				BreakDuration: w.BreakDuration,
				FlexiIn: w.FlexiIn,
				FlexiOut: w.FlexiOut,
				CreatedBy: w.CreatedBy
			});
		};

		await shiftObj.push(
			{
				"shiftId": req.body.shiftId,
				"Weeks": Weeks
			});

		await response.push(shiftObj);
		if (response) {
			res.send({ status: 1, message: 'Success', data: response });
		}
		else {
			res.send({ status: 0, message: 'Error' });
		}
	}
	catch (err) {
		res.status(400).send(err);
	}
};

exports.updateShiftWeeks = async (req, res) => {
	try {
		if (!req.body.shiftId && req.body.shiftId <= 0 && !req.body.weeks) {
			res.status(400).send({
				message: "Content can not be empty!"
			});
			return;
		}
		var response = [];
		let Weeks = [];
		for (const week of req.body.weeks) {
			//req.body.weeks.forEach(async week => {
			const weekdetail = {
				Shift_Id: req.body.shiftId,
				Day: week.day,
				StartTime: week.startTime,
				EndTime: week.endTime,
				BreakDuration: week.breakDuration,
				FlexiIn: week.flexiIn,
				FlexiOut: week.flexiOut,
				UpdatedAt: dateformatehelper.convertdatetoothertimezone(new Date(), req.session.userProfile.data.Timezone)
			};
			const wd = await ShiftWeekDetail.update(weekdetail, { where: { Id: week.id } });
			Weeks.push(wd);
		};
		//shift.push(Weeks);
		response.push(Weeks);
		if (response) {
			res.send({ status: 1, message: 'Success', data: response });
		}
		else {
			res.send({ status: 0, message: 'Error' });
		}
	}
	catch (err) {
		res.status(400).send(err);
	}
};

exports.createUserShift = async (req, res) => {
	try {
		if (!req.body.shiftUsers && req.body.shiftUsers.length > 0) {
			res.status(400).send({
				message: "Content can not be empty!"
			});
			return;
		}
		var userShift = [];
		for (const user of req.body.shiftUsers) {
			//await req.body.shiftUsers.forEach(async user => {

			const _usershift = {
				Personal_Detail_Id: user.personalDetailId,
				Shift_Id: user.shiftId,
				FromDate: user.fromDate,
				IsActive: user.isActive,
				// CreatedBy: req.body.userProfileId,
				// CreatedAt: dateformatehelper.convertdatetoothertimezone(new Date(), req.session.userProfile.data.Timezone)
			};
			const us = await UserShiftLink.create(_usershift);
			userShift.push(us);
		};

		if (userShift) {
			res.send({ status: 1, message: 'Success', data: userShift });
		}
		else {
			res.send({ status: 0, message: 'Error' });
		}
	}
	catch (err) {
		res.status(400).send(err);
	}
};

exports.updateUserShift = async (req, res) => {
	try {
		if (!req.body.shiftUsers && req.body.shiftUsers.length > 0) {
			res.status(400).send({
				message: "Content can not be empty!"
			});
			return;
		}
		var userShift = [];
		for (const user of req.body.shiftUsers) {
			//await req.body.shiftUsers.forEach(async user => {

			const _usershift = {
				Personal_Detail_Id: user.personalDetailId,
				Shift_Id: user.shiftId,
				FromDate: user.fromDate,
				IsActive: user.isActive
			};
			const us = await UserShiftLink.update(_usershift, { where: { id: user.id } });
			userShift.push(us);
		};

		if (userShift) {
			res.send({ status: 1, message: 'Success', data: userShift });
		}
		else {
			res.send({ status: 0, message: 'Error' });
		}
	}
	catch (err) {
		res.status(400).send(err);
	}
};

exports.findAllShift = async (req, res) => {
	const finddata = await HrShift.findAll({ include: [{ model: ShiftWeekDetail }, { model: DeptShiftLink }, { model: UserShiftLink }] });
	if (finddata) {
		res.send({ status: 1, message: 'Success', data: finddata });
	} else {
		res.send({ status: 0, message: 'Unsuccess', data: [] });
	}
};

exports.findShiftByShiftId = async (req, res) => {
	const finddata = await HrShift.findAll(
		{ 
			where: { id: req.body.shiftId },
			include: 
			[
				{ model: ShiftWeekDetail }, 
				{ model: DeptShiftLink }, 
				{ model: UserShiftLink }
			] 
		});
	if (finddata) {
		res.send({ status: 1, message: 'Success', data: finddata });
	} else {
		res.send({ status: 0, message: 'Unsuccess', data: [] });
	}
};

exports.findUserShifts = async (req, res) => {
	const finddata = await UserShiftLink.findAll({
		where: { Personal_Detail_Id: req.body.personalDetailId },
		include: [{ model: HrShift }, { model: ShiftWeekDetail }]
	});
	if (finddata) {
		res.send({ status: 1, message: 'Success', data: finddata });
	} else {
		res.send({ status: 0, message: 'Unsuccess', data: [] });
	}
};

exports.createClockInOut = async (req, res) => {
	try {
		if (!req.body.clockIn) {
			res.status(400).send({
				message: "Content can not be empty!"
			});
			return;
		}
		var isMachineRequest = 1;
		if (typeof req.body.isMachineRequest !== 'undefined' && req.body.isMachineRequest === 0) {
			isMachineRequest = 0;
		}

		var clockDetail = await ClockInOut.findOne({
			where: { Date_Clock_In: req.body.clockInDate, Personal_Detail_Id: req.body.personalDetailId },
			order: [['id', 'DESC']]
		});

		if (clockDetail && clockDetail.Clock_Out === null) {
			res.send({ status: 0, message: 'cannot clockIn on same day prior to clockout' });
			//return
		}

		var clockInDate = req.body.clockInDate;
		var clockInTime = req.body.clockIn;
		if (req.session && req.session.userProfile && req.body.timeZone != req.session.userProfile.data.Timezone) {
			let clockInDateTime = dateformatehelper.converttimetoothertimezone(req.body.clockInDate, req.body.clockIn, req.body.timeZone, req.session.userProfile.data.Timezone);
			clockInDate = clockInDateTime.split(',')[0].trim();
			clockInTime = clockInDateTime.split(',')[1].trim();
		}

		const clockInOut = {
			Personal_Detail_Id: req.body.personalDetailId,
			Date_Clock_In: clockInDate,
			Clock_In: clockInTime,
			Clock_Out: req.body.clockOut,
			Latitude: req.body.latitude,
			Longitude: req.body.longitude,
			DistanceInKilometerFromOffice: req.body.distanceInKilometerFromOffice,
			IsMachineRequest: isMachineRequest
		};
		const clock = await ClockInOut.create(clockInOut);
		if (clock) {
			res.send({ status: 1, message: 'Success', data: clock });
		}
		else {
			res.send({ status: 0, message: 'Error' });
		}
	}
	catch (err) {
		res.status(400).send(err);
	}
};

exports.updateClockInOut = async (req, res) => {
	try {
		if (!req.body.clockOut && !req.body.date) {
			res.status(400).send({
				message: "Content can not be empty!"
			});
			return;
		}
		var clockDetail = await ClockInOut.findOne({
			where: { Date_Clock_In: req.body.clockOutDate, Personal_Detail_Id: req.body.personalDetailId },
			order: [['id', 'DESC']]
		});
		if (!clockDetail) {
			clockDetail = await ClockInOut.findOne({
				where: { Personal_Detail_Id: req.body.personalDetailId },
				order: [['Date_Clock_In', 'DESC']]
			});
		}
		var clockOutDate = req.body.clockOutDate;
		var clockOutTime = req.body.clockOut;
		if (req.session && req.session.userProfile && req.body.timeZone != req.session.userProfile.data.Timezone) {
			let clockOutDateTime = dateformatehelper.converttimetoothertimezone(req.body.clockOutDate, req.body.clockOut, req.body.timeZone, req.session.userProfile.data.Timezone);
			clockOutDate = clockOutDateTime.split(',')[0].trim();
			clockOutTime = clockOutDateTime.split(',')[1].trim();
		}
		const clockInOut = {
			Clock_Out: clockOutTime,
			Date_Clock_Out: clockOutDate,
			Clock_Difference: dateformatehelper.datesdifference(clockOutDate.trim() + " " + clockOutTime.trim(), clockDetail.Date_Clock_In.trim() + " " + clockDetail.Clock_In.trim())
		};
		const clock = await ClockInOut.update(clockInOut, {
			where: {
				id: clockDetail.id
			}
		});

		if (clock) {
			res.send({ status: 1, message: 'Success', data: clock });
		}
		else {
			res.send({ status: 0, message: 'Error' });
		}
	}
	catch (err) {
		res.status(400).send(err);
	}
};

exports.findAllClockInOut = async (req, res) => {
	const finddata = await ClockInOut.findAll();
	if (finddata) {
		res.send({ status: 1, message: 'Success', data: finddata });
	}
};

exports.findClockInOutByProfileId = async (req, res) => {
	let Clock_OutCheck = null;
	if(!req.body.personalDetailId){
		res.status(400).send({
			message: "Content can not be empty!"
		});
		return;
	}
	var clockDetail = await ClockInOut.findOne({
		where: { Date_Clock_In: req.body.clockInDate, Personal_Detail_Id: req.body.personalDetailId, Clock_Out: Clock_OutCheck }
	});
	if (clockDetail) {
		res.send({ status: 1, message: 'Success', data: clockDetail });
	}
};

exports.findClockInOutRangeByProfileId = async (req, res) => {
	let results = await sequelize.query(
		'SELECT * FROM hr.Clock_InOut where (convert(DATETIME2, Date_Clock_In, 103) >= convert(DATETIME2,:startDate, 103) ) and (convert(DATETIME2, Date_Clock_In, 103) <= convert(DATETIME2,:endDate, 103));',
		{
			replacements: { startDate: req.body.from_date, endDate: req.body.to_date },
			type: QueryTypes.SELECT
		}
	);

	if (results) {
		res.send({ status: 1, message: 'Success', data: results });
	}
};

exports.createBusinessUnit = async (req, res) => {
	if (!req.body.Description) {
		res.status(400).send({
			message: "Content can not be empty!"
		});
		return;
	}
	const businessUnit = {
		Description: req.body.Description
	};
	const bu = await BusinessUnit.create(businessUnit);
	if (bu) {
		res.send({ status: 1, message: 'Success', data: bu });
	}
	else {
		res.send({ status: 0, message: 'Error' });
	}
};

exports.findAllBusinessUnit = async (req, res) => {
	const finddata = await getAllBusinessUnit;
	if (finddata) {
		res.send({ status: 1, message: 'Success', data: finddata });
	}
};

exports.createCampaign = async (req, res) => {
	if (!req.body.Description) {
		res.status(400).send({
			message: "Content can not be empty!"
		});
		return;
	}
	const campaign = {
		Description: req.body.Description
	};
	const cam = await Campaign.create(campaign);
	if (cam) {
		res.send({ status: 1, message: 'Success', data: cam });
	}
	else {
		res.send({ status: 0, message: 'Error' });
	}
};

exports.findAllCampaign = async (req, res) => {
	const finddata = await getAllCampaign;
	if (finddata) {
		res.send({ status: 1, message: 'Success', data: finddata });
	}
};

exports.findAllCardIssueStatus = async (req, res) => {
	const finddata = await getAllCardIssueStatus();
	if (finddata) {
		res.send({ status: 1, message: 'Success', data: finddata });
	}
	else {
		res.send({ status: 0, message: 'Error' });
	}
};

exports.createCompanyDomain = async (req, res) => {
	if (!req.body.Description) {
		res.status(400).send({
			message: "Content can not be empty!"
		});
		return;
	}
	const companyDomain = {
		Description: req.body.Description
	};
	const cd = await CompanyDomain.create(companyDomain);
	if (cd) {
		res.send({ status: 1, message: 'Success', data: cd });
	}
	else {
		res.send({ status: 0, message: 'Error' });
	}
};

exports.findAllCompanyDomain = async (req, res) => {
	const finddata = await getAllCompanyDomain;
	if (finddata) {
		res.send({ status: 1, message: 'Success', data: finddata });
	}
};

exports.createCostCenter = async (req, res) => {
	if (!req.body.Description) {
		res.status(400).send({
			message: "Content can not be empty!"
		});
		return;
	}
	const costCenter = {
		Description: req.body.Description
	};
	const cc = await CostCenter.create(costCenter);
	if (cc) {
		res.send({ status: 1, message: 'Success', data: cc });
	}
	else {
		res.send({ status: 0, message: 'Error' });
	}
};

exports.findAllCostCenter = async (req, res) => {
	const finddata = await getAllCostCenter;
	if (finddata) {
		res.send({ status: 1, message: 'Success', data: finddata });
	}
};

exports.createDepartment = async (req, res) => {
	if (!req.body.Description) {
		res.status(400).send({
			message: "Content can not be empty!"
		});
		return;
	}
	const department = {
		Description: req.body.Description
	};
	const dept = await Department.create(department);
	if (dept) {
		res.send({ status: 1, message: 'Success', data: dept });
	}
	else {
		res.send({ status: 0, message: 'Error' });
	}
};

exports.findAllDepartment = async (req, res) => {
	const finddata = await getAllDepartment;
	if (finddata) {
		res.send({ status: 1, message: 'Success', data: finddata });
	}
};

exports.createDesignation = async (req, res) => {
	if (!req.body.Description) {
		res.status(400).send({
			message: "Content can not be empty!"
		});
		return;
	}
	const designation = {
		Description: req.body.Description
	};
	const des = await Designation.create(designation);
	if (des) {
		res.send({ status: 1, message: 'Success', data: des });
	}
	else {
		res.send({ status: 0, message: 'Error' });
	}
};

exports.findAllDesignation = async (req, res) => {
	const finddata = await getAllDesignation;
	if (finddata) {
		res.send({ status: 1, message: 'Success', data: finddata });
	}
};

exports.createGroup = async (req, res) => {
	if (!req.body.Description) {
		res.status(400).send({
			message: "Content can not be empty!"
		});
		return;
	}
	const group = {
		Description: req.body.Description
	};
	const grp = await Group.create(group);
	if (grp) {
		res.send({ status: 1, message: 'Success', data: grp });
	}
	else {
		res.send({ status: 0, message: 'Error' });
	}
};

exports.findAllGroup = async (req, res) => {
	const data = await Group.findAll({ include: Company });
	res.status(200).send({ status: 1, message: 'Success', data: data });
	// const finddata = await getAllGroup;
	// if(finddata){
	//   res.send({status:1, message:'Success', data:finddata});
	// }
};

exports.createHrModuleType = async (req, res) => {
	if (!req.body.Description) {
		res.status(400).send({
			message: "Content can not be empty!"
		});
		return;
	}
	const hrModuleType = {
		Description: req.body.Description
	};
	const moduleType = await HrModuleType.create(hrModuleType);
	if (moduleType) {
		res.send({ status: 1, message: 'Success', data: moduleType });
	}
	else {
		res.send({ status: 0, message: 'Error' });
	}
};

exports.findAllHrModuleType = async (req, res) => {
	const finddata = await getAllHrModuleType;
	if (finddata) {
		res.send({ status: 1, message: 'Success', data: finddata });
	}
};

exports.createHrSeparationStatus = async (req, res) => {
	if (!req.body.Description) {
		res.status(400).send({
			message: "Content can not be empty!"
		});
		return;
	}
	const hrSeparationStatus = {
		Description: req.body.Description
	};
	const separationType = await HrSeparationStatus.create(hrSeparationStatus);
	if (separationType) {
		res.send({ status: 1, message: 'Success', data: separationType });
	}
	else {
		res.send({ status: 0, message: 'Error' });
	}
};

exports.findAllHrSeparationStatus = async (req, res) => {
	const finddata = await getAllHrSeparationStatus;
	if (finddata) {
		res.send({ status: 1, message: 'Success', data: finddata });
	}
};

exports.createJobCategory = async (req, res) => {
	if (!req.body.Description) {
		res.status(400).send({
			message: "Content can not be empty!"
		});
		return;
	}
	const jobCategory = {
		Description: req.body.Description
	};
	const jc = await JobCategory.create(jobCategory);
	if (jc) {
		res.send({ status: 1, message: 'Success', data: jc });
	}
	else {
		res.send({ status: 0, message: 'Error' });
	}
};

exports.findAllJobCategory = async (req, res) => {
	const finddata = await getAllJobCategory;
	if (finddata) {
		res.send({ status: 1, message: 'Success', data: finddata });
	}
};

exports.createLeaveRequestType = async (req, res) => {
	if (!req.body.Description) {
		res.status(400).send({
			message: "Content can not be empty!"
		});
		return;
	}
	const leaveRequestType = {
		Description: req.body.Description
	};
	const lrt = await LeaveRequestType.create(leaveRequestType);
	if (lrt) {
		res.send({ status: 1, message: 'Success', data: lrt });
	}
	else {
		res.send({ status: 0, message: 'Error' });
	}
};

exports.findAllLeaveRequestType = async (req, res) => {
	const finddata = await getAllLeaveRequestType;
	if (finddata) {
		res.send({ status: 1, message: 'Success', data: finddata });
	}
};

exports.createLocation = async (req, res) => {
	if (!req.body.Description) {
		res.status(400).send({
			message: "Content can not be empty!"
		});
		return;
	}
	const location = {
		Description: req.body.Description
	};
	const loc = await Location.create(location);
	if (loc) {
		res.send({ status: 1, message: 'Success', data: loc });
	}
	else {
		res.send({ status: 0, message: 'Error' });
	}
};

exports.findAllLocation = async (req, res) => {
	const finddata = await getAllLocation;
	if (finddata) {
		res.send({ status: 1, message: 'Success', data: finddata });
	}
};

exports.findAllNoticePeriodType = async (req, res) => {
	const finddata = await getAllNoticePeriodType;
	if (finddata) {
		res.send({ status: 1, message: 'Success', data: finddata });
	}
};

exports.createQualification = async (req, res) => {
	if (!req.body.Description) {
		res.status(400).send({
			message: "Content can not be empty!"
		});
		return;
	}
	const qualification = {
		Description: req.body.Description
	};
	const quali = await Qualification.create(qualification);
	if (quali) {
		res.send({ status: 1, message: 'Success', data: quali });
	}
	else {
		res.send({ status: 0, message: 'Error' });
	}
};

exports.findAllQualification = async (req, res) => {
	const finddata = await getAllQualification;
	if (finddata) {
		res.send({ status: 1, message: 'Success', data: finddata });
	}
};

exports.createReason = async (req, res) => {
	if (!req.body.Description) {
		res.status(400).send({
			message: "Content can not be empty!"
		});
		return;
	}
	const reason = {
		Description: req.body.Description
	};
	const reas = await Reason.create(reason);
	if (reas) {
		res.send({ status: 1, message: 'Success', data: reas });
	}
	else {
		res.send({ status: 0, message: 'Error' });
	}
};

exports.findAllReason = async (req, res) => {
	const finddata = await getAllReason;
	if (finddata) {
		res.send({ status: 1, message: 'Success', data: finddata });
	}
};

exports.createRelationship = async (req, res) => {
	if (!req.body.Description) {
		res.status(400).send({
			message: "Content can not be empty!"
		});
		return;
	}
	const relationship = {
		Description: req.body.Description
	};
	const relation = await Relationship.create(relationship);
	if (relation) {
		res.send({ status: 1, message: 'Success', data: relation });
	}
	else {
		res.send({ status: 0, message: 'Error' });
	}
};

exports.findAllRelationship = async (req, res) => {
	const finddata = await getAllRelationship;
	if (finddata) {
		res.send({ status: 1, message: 'Success', data: finddata });
	}
};

exports.createRequestStatus = async (req, res) => {
	if (!req.body.Description) {
		res.status(400).send({
			message: "Content can not be empty!"
		});
		return;
	}
	const requestStatus = {
		Description: req.body.Description
	};
	const rs = await RequestStatus.create(requestStatus);
	if (rs) {
		res.send({ status: 1, message: 'Success', data: rs });
	}
	else {
		res.send({ status: 0, message: 'Error' });
	}
};

exports.findAllRequestStatus = async (req, res) => {
	const finddata = await getAllRequestStatus;
	if (finddata) {
		res.send({ status: 1, message: 'Success', data: finddata });
	}
};

exports.createRequisitionNumber = async (req, res) => {
	if (!req.body.Description) {
		res.status(400).send({
			message: "Content can not be empty!"
		});
		return;
	}
	const requisitionNumber = {
		Description: req.body.Description
	};
	const rn = await RequisitionNumber.create(requisitionNumber);
	if (rn) {
		res.send({ status: 1, message: 'Success', data: rn });
	}
	else {
		res.send({ status: 0, message: 'Error' });
	}
};

exports.findAllRequisitionNumber = async (req, res) => {
	const finddata = await getAllRequisitionNumber;
	if (finddata) {
		res.send({ status: 1, message: 'Success', data: finddata });
	}
};

exports.createTerminationType = async (req, res) => {
	if (!req.body.Description) {
		res.status(400).send({
			message: "Content can not be empty!"
		});
		return;
	}
	const terminationType = {
		Description: req.body.Description
	};
	const tt = await TerminationType.create(terminationType);
	if (tt) {
		res.send({ status: 1, message: 'Success', data: tt });
	}
	else {
		res.send({ status: 0, message: 'Error' });
	}
};

exports.findAllTerminationType = async (req, res) => {
	const finddata = await getAllTerminationType;
	if (finddata) {
		res.send({ status: 1, message: 'Success', data: finddata });
	}
};

exports.createGender = async (req, res) => {
	if (!req.body.Description) {
		res.status(400).send({
			message: "Content can not be empty!"
		});
		return;
	}
	const gender = {
		Description: req.body.Description
	};
	const g = await Gender.create(gender);
	if (g) {
		res.send({ status: 1, message: 'Success', data: g });
	}
	else {
		res.send({ status: 0, message: 'Error' });
	}
};

exports.findAllGender = async (req, res) => {
	const finddata = await getAllGender;
	if (finddata) {
		res.send({ status: 1, message: 'Success', data: finddata });
	}
};

exports.createTimezone = async (req, res) => {
	if (!req.body.Description) {
		res.status(400).send({
			message: "Content can not be empty!"
		});
		return;
	}
	const timezone = {
		Description: req.body.Description
	};
	const tz = await Timezone.create(timezone);
	if (tz) {
		res.send({ status: 1, message: 'Success', data: tz });
	}
	else {
		res.send({ status: 0, message: 'Error' });
	}
};

exports.findAllTimezone = async (req, res) => {
	const finddata = await getAllTimezone;
	if (finddata) {
		res.send({ status: 1, message: 'Success', data: finddata });
	}
};

exports.getAllTimezone = async (req, res) => {
	const finddata = await getAllTimezone();
	console.log(500)
	if (finddata) {
		return ({ status: 1, message: 'Success', data: finddata });
	}
	else{
		return 
	}
};

exports.getAllHrLookUps = async (req, res) => {
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
	res.send({
		status: 1, message: 'Success', group, location, businessUnit, companydomain,
		businessUnit, department, campaign, jobcategory, designation, costcenter, hrmoduletype,
		leaverequesttype, reason, relationship, requeststatus, gender, timezone, qualification
	});
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
