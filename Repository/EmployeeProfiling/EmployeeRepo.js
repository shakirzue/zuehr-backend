const { QueryTypes } = require('sequelize');
const path = require('path');
const { sequelize } = require("../../models");
const db = require("../../models");
const Op = db.Sequelize.Op;

const dateformatehelper = require('../../helpers/datehelper');
const timeZoneType = require('../../helpers/TimeZoneTypes');
const mischelper = require('../../helpers/mischelper');
const userprofilehelper = require('../../helpers/userprofilehelper');
const lookupServices = require('../../Services/EmployeeProfiling/LookupService');

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
const Designation = db.designation;
const Gender = db.gender;

async function checkIfEmployeeIdExist(filter) {
	const finddata = await PersonalDetails.findOne(filter);

	return finddata ? finddata : false;
}

exports.createPersonalDetails = async (req, res) => {
	try {

		const { employeeId } = req.body;
		if (!req.body && !employeeId) {
			return ({ send:400, 
				message: "Content can not be empty!"
			});
			return;
		}
		const user =await userprofilehelper.getUserByEmail(req, res);
		let filter = {
			where: {
				[Op.or]: [
					{ EmployeeCode: employeeId },
					{ User_Profile_Id: user.User_Profile_Id }
				  ]
			}
		}
		let isEmployeeExist = await checkIfEmployeeIdExist(filter);

		if (isEmployeeExist != false) {
			return ({ status: 400, message: 'Employee Id Already Exist' });
		}

		const personalDetails = {
			User_Profile_Id: user.User_Profile_Id,
			EmployeeCode: req.body.employeeId,
			FirstName: req.body.firstName,
			MiddleName: req.body.middleName,
			LastName: req.body.lastName,
			Guardian_Name: req.body.guardianName,
			Phone: req.body.phone,
			DateOfBirth: req.body.dateOfBirth,
			DateOfJoining: req.body.dateOfJoining,
			Gender_Id: req.body.genderId,
			Email: req.body.email,
			Official_Email: req.body.officialEmail,
			IdentityNumber: req.body.identityNumber,
			Company_Id: req.body.companyId,
			Designation_Id: req.body.designationId,
			Department_Id: req.body.departmentId,
			Location_Id: req.body.locationId,
			isExecutive: req.body.isExecutive,
			ReportingUserId: req.body.reportingUserId,
			//createdAt: new Date().tojson()
		};
		const pd = await PersonalDetails.create(personalDetails);
		if (pd) {
			return ({ status: 200, message: 'Success', data: pd });
		}
		else {
			return ({ status: 500, message: 'Record did not save' });
		}
	}
	catch (err) {
		return ({status:500, message: err});
	}
};

exports.updatePersonalDetails = async (req, res) => {
	try {
		if (!req.body && !req.body.employeeId) {
			return ({ status: 400,
				message: "Content can not be provided!"
			});
			return;
		}
		const user =await userprofilehelper.getUserByEmail(req, res);
		const personalDetails = {
			User_Profile_Id: user.id,
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
			Offical_Email: req.body.officalEmail,
			IdentityNumber: req.body.identityNumber,
			Company_Id: req.body.companyId,
			Designation_Id: req.body.designationId,
			Department_Id: req.body.departmentId,
			Location_Id: req.body.locationId,
			isExecutive: req.body.isExecutive,
			ReportingUserId: req.body.reportingUserId,
			updatedAt: new Date().toJSON()
		};

		const pd = await PersonalDetails.update(personalDetails, {
			where: {
				Personal_Detail_Id: req.body.personalDetailId
			}
		});
		if (pd) {
			res.send({ status: 200, message: 'Success', data: pd });
		}
		else {
			res.send({ status: 500, message: 'Record did not update' });
		}
	}
	catch (err) {
		return ({status:500, message: err});
	}
};

exports.findPersonalDetailsByEmployeeId = async (req, res) => {
    if(!req.body && !req.body.employeeId){
        return ({ status: 400, message: 'Required Content(s) are provided' });
    }

	let filter = {
		where: { EmployeeCode: req.body.employeeId },
		include: [{ model: Gender }, { model: Company, include: [Designation] }]
	}
	const finddata = await checkIfEmployeeIdExist(filter)
	if (finddata) {
		return ({ status: 200, message: 'Success', data: finddata });
	} else {
		return ({ status: 500, message: 'Record not found', data: [] });
	}
};

exports.findPersonalDetailsByUserProfileId = async (req, res) => {
    if(!req.body && !req.body.userProfileId){
        return ({ status: 400, message: 'Required Content(s) are provided' });
    }

	let filter = {
		where: { User_Profile_Id: req.body.userProfileId }
	}
	const finddata = await checkIfEmployeeIdExist(filter)
	if (finddata) {
		return ({ status: 200, message: 'Success', data: finddata });
	} else {
		return ({ status: 500, message: 'record not found', data: [] });
	}
};

exports.findPersonalDetailsById = async (req, res) => {
    if(!req.body && !req.body.id){
        return ({ status: 400, message: 'Required Content(s) are provided' });
    }

	let filter = {
		where: { Personal_Detail_Id: req.body.id }
	}
	const finddata = await checkIfEmployeeIdExist(filter)
	if (finddata) {
		return ({ status: 200, message: 'Success', data: finddata });
	} else {
		return ({ status: 500, message: 'record not found', data: [] });
	}
};

exports.findAllPersonalDetails = async (req, res) => {
	var finddata = null;
	var totalRecords = 0;
    if(!req.body.size && !req.body.pageIndex){
        return ({ status: 400, message: 'Required Content(s) are provided' });
    }

	await PersonalDetails.findAndCountAll({
		include: [{ model: Gender }, { model: Company, include: [Designation] }],
		limit: req.body.size,
		offset: mischelper.getPagingOffset(req.body.pageIndex, req.body.size)
	})
	.then(result => {
		finddata = result.rows;
		totalRecords = result.count;
	  });
	if (finddata) {
		return ({ status: 200, message: 'Success', data: finddata, totalRecords: totalRecords });
	} else {
		return ({ status: 500, message: 'Unsuccess', data: [], totalRecords: 0 });
	}
};

// exports.createCompany = async (req, res) => {
// 	try {
// 		if (!req.body.groupId) {
// 			return ({ status: 400,
// 				message: "Content can not be empty!"
// 			});
// 			return;
// 		}

// 		const company = {
// 			Name: req.body.name, 
// 			// Personal_Detail_Id: req.body.personalDetailId,
// 			//Group_Id: req.body.groupId,
// 			//Location_Id: req.body.locationId,
// 			//Company_Domain_Id: req.body.companyDomainId,
// 			//Business_Unit_Id: req.body.businessUnitId,
// 			//Department_Id: req.body.departmentId,
// 			//Job_Category_Id: req.body.jobCategoryId,
// 			//Designation_Id: req.body.designationId,
// 			//Campaign_Id: req.body.campaignId,
// 			//Requisition_Id: req.body.requisitionId,
// 			CreatedBy: req.body.userProfileId,
// 			CreatedAt: dateformatehelper.convertdatetoothertimezone(new Date(), req.session.userProfile.Timezone)
// 		};

// 		const com = await Company.create(company);
// 		if (com) {
// 			return ({ status: 200, message:r_Profile_Id}})
exports.findPersonalDetailsByDepartmentId = async (req, res) => {
	const finddata = await PersonalDetails.findOne({ where: { User_Profile_Id: req.body.userProfileId } });
	const finddata1 = await PersonalDetails.findAll({ where: { Department_Id: finddata.Department_Id } });
	const finddata2 = await PersonalDetails.findAll({ where: { isExecutive: true } });
	
	//const finddata = finddata2.concat(finddata1);

	if (finddata1 && finddata2) {
		return ({ status: 200, message: 'Success', data: finddata1,  data2: finddata2 });
	} else {
		return ({ status: 500, message: 'record not found', data: [] });
	}
};

exports.createFamilyInformation = async (req, res) => {
	try {
		if (!req.body.personalDetailId) {
			return ({status: 400,
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
			CreatedAt: dateformatehelper.convertdatetoothertimezone(new Date(), req.session.userProfile.Timezone)
		};

		const fi = await FamilyInformation.create(familyInformation);
		if (fi) {
			return ({ status: 200, message: 'Success', data: fi });
		}
		else {
			return ({ status: 500, message: 'Error in fetching data or record not found' });
		}
	}
	catch (err) {
		return ({ status: 500, message: err});
	}
};

exports.updateFamilyInformation = async (req, res) => {
	try {
		if (!req.body.personalDetailId) {
			return ({ status:400,
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
			UpdatedAt: dateformatehelper.convertdatetoothertimezone(new Date(), req.session.userProfile.Timezone)
		};

		const fi = await FamilyInformation.update(familyInformation, {
			where: {
				id: req.body.id
			}
		});
		if (fi) {
			return ({ status: 200, message: 'Success', data: fi });
		}
		else {
			return ({ status: 500, message: 'Error while fetching data or record not found' });
		}
	}
	catch (err) {
		return ({status:500, message: err});
	}
};

exports.findFamilyInformationByUserProfileId = async (req, res) => {
    if(!req.body.personalDetailId){
        return ({status: 400, message: "Content cannot be empty"});
    }
	const finddata = await FamilyInformation.findOne({
		include: [{ model: Relationship }, { model: Qualification }],
		where: { Personal_Detail_Id: req.body.personalDetailId }
	});
	if (finddata) {
		return ({ status: 200, message: 'Success', data: finddata });
	} else {
		return ({ status: 500, message: 'Record not found', data: [] });
	}
};

exports.createExperience = async (req, res) => {
	try {
		if (!req.body.personalDetailId) {
			return ({ status: 400,
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
			CreatedAt: dateformatehelper.convertdatetoothertimezone(new Date(), req.session.userProfile.Timezone)
		};

		const exp = await Experience.create(experience);
		if (exp) {
			return ({ status: 200, message: 'Success', data: exp });
		}
		else {
			return ({ status: 500, message: 'Error while fetching data or record not found' });
		}
	}
	catch (err) {
		return ({status:500, message: err});
	}
};

exports.updateExperience = async (req, res) => {
	try {
		if (!req.body.personalDetailId && !req.body.companyName) {
			return ({ status: 400,
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
			UpdatedAt: dateformatehelper.convertdatetoothertimezone(new Date(), req.session.userProfile.Timezone)
		};

		const exp = await Experience.update(experience, {
			where: {
				id: req.body.id
			}
		});
		if (exp) {
			return ({ status: 200, message: 'Success', data: exp });
		}
		else {
			return ({ status: 500, message: 'Error while fetching data or record not found' });
		}
	}
	catch (err) {
		return ({status:500, message: err});
	}
};

exports.findExperienceByUserProfileId = async (req, res) => {

    if(!req.body.personalDetailId){
        return ({status: 400, message: "required filed is not provided"})
    }
	const finddata = await Experience.findOne({
		include: [{ model: Designation }],
		where: { Personal_Detail_Id: req.body.personalDetailId }
	});

	if (finddata) {
		return ({ status: 200, message: 'Success', data: finddata });
	} else {
		return ({ status: 500, message: 'Unsuccess', data: [] });
	}
};

exports.createAcademic = async (req, res) => {
	try {
		if (!req.body.institudeName && !req.body.personalDetailId) {
			return ({ status: 400,
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
			CreatedAt: dateformatehelper.convertdatetoothertimezone(new Date(), req.session.userProfile.Timezone)
		};

		const aca = await Academic.create(acadamic);
		if (aca) {
			return ({ status: 200, message: 'Success', data: aca });
		}
		else {
			return ({ status: 500, message: 'Error while fetching data or record not found' });
		}
	}
	catch (err) {
		return ({status: 500, message: err});
	}
};

exports.updateAcademic = async (req, res) => {
	try {
		if (!req.body.personalDetailId && !req.body.institudeName) {
			return ({ status: 400,
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
			UpdatedAt: dateformatehelper.convertdatetoothertimezone(new Date(), req.session.userProfile.Timezone)
		};
		const aca = await Academic.update(academic, {
			where: {
				id: req.body.id
			}
		});
		if (aca) {
			return ({ status: 200, message: 'Success', data: aca });
		}
		else {
			return ({ status: 500, message: 'Error while fetching data or record not found' });
		}
	}
	catch (err) {
		return ({status: 500, message: err});
	}
};

exports.findAcademicByUserProfileId = async (req, res) => {
    if(!req.body.personalDetailId){
        return ({status: 400, message: "Required field cannot be empty"})
    }
	const finddata = await Academic.findAll({ where: { Personal_Detail_Id: req.body.personalDetailId } });
	if (finddata) {
		res.send({ status: 200, message: 'Success', data: finddata });
	} else {
		res.send({ status: 500, message: 'Unsuccess', data: [] });
	}
};

exports.createProfessionalReference = async (req, res) => {
	try {
		if (!req.body.name && !req.body.personalDetailId) {
			return ({ status: 400,
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
			CreatedAt: dateformatehelper.convertdatetoothertimezone(new Date(), req.session.userProfile.Timezone)
		};

		const pr = await ProfessionalReference.create(professionalReference);
		if (pr) {
			return ({ status: 200, message: 'Success', data: pr });
		}
		else {
			return ({ status: 500, message: 'Error while fetching data or record not found' });
		}
	}
	catch (err) {
		return ({status: 500, message: err});
	}
};

exports.updateProfessionalReference = async (req, res) => {
	try {
		if (!req.body.name) {
			return ({ status: 400,
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
			UpdatedAt: dateformatehelper.convertdatetoothertimezone(new Date(), req.session.userProfile.Timezone)
		};
		const pr = await ProfessionalReference.update(professionalReference, {
			where: {
				id: req.body.id
			}
		});
		if (pr) {
			res.send({ status: 200, message: 'Success', data: pr });
		}
		else {
			res.send({ status: 500, message: 'Error while fetching data or record not found' });
		}
	}
	catch (err) {
		return ({status: 500, message: err});
	}
};

exports.findProfessionalReferenceByUserProfileId = async (req, res) => {
    if(!req.body.personalDetailId){
        return ({status: 400, message: "Required field cannot be empty"})
    }
	const finddata = await ProfessionalReference.findAll({
		include: [{ model: Relationship }, { model: Designation }],
		where: { Personal_Detail_Id: req.body.personalDetailId }
	});
	if (finddata) {
		return ({ status: 200, message: 'Success', data: finddata });
	} else {
		return ({ status: 500, message: 'Unsuccess', data: [] });
	}
};

exports.createContactDetails = async (req, res) => {
	try {
		if (!req.body.name) {
			return ({ status: 400,
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
			CreatedAt: dateformatehelper.convertdatetoothertimezone(new Date(), req.session.userProfile.Timezone)
		};

		const cd = await ContactDetails.create(contactDetails);
		if (cd) {
			res.send({ status: 200, message: 'Success', data: cd });
		}
		else {
			res.send({ status: 500, message: 'Error' });
		}
	}
	catch (err) {
		return ({status: 500, message: err});
	}
};

exports.updateContactDetails = async (req, res) => {
	try {
		if (!req.body.name && !req.body.personalDetailId) {
			return ({status: 400,
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
			UpdatedAt: dateformatehelper.convertdatetoothertimezone(new Date(), req.session.userProfile.Timezone)
		};
		const cd = await ContactDetails.update(contactDetails, {
			where: {
				id: req.body.id
			}
		});
		if (cd) {
			return ({ status: 200, message: 'Success', data: cd });
		}
		else {
			return ({ status: 500, message: 'Error while fetching data or record not found' });
		}
	}
	catch (err) {
		return ({status: 500, message: err});
	}
};

exports.findContactDetailsByUserProfileId = async (req, res) => {
    if(!req.body.personalDetailId){
        return ({status: 400, message: "required field cannot be empty"});
    }
	const finddata = await ContactDetails.findAll({
		include: [{ model: Relationship }],
		where: { Personal_Detail_Id: req.body.personalDetailId }
	});
	if (finddata) {
		return ({ status: 200, message: 'Success', data: finddata });
	} else {
		return ({ status: 500, message: 'Unsuccess', data: [] });
	}
};

exports.createDocumentUpload = async (req, res) => {
	try {
		var doc = [];
		if (!req.body.personalDetailId) {
			return ({ status: 400,
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
				CreatedAt: dateformatehelper.convertdatetoothertimezone(new Date(), req.session.userProfile.Timezone)
			};
			doc.push(await DocumentUpload.create(documentUpload));
		});

		if (doc) {
			return ({ status: 200, message: 'Success', data: doc });
		}
		else {
			return ({ status: 500, message: 'Error while fetching data or record not found' });
		}
	}
	catch (err) {
		return ({status: 500, message: err});
	}
};

exports.updateDocumentUpload = async (req, res) => {
	try {
		if (!req.body.personalDetailId) {
			return ({ status: 400,
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
			UpdatedAt: dateformatehelper.convertdatetoothertimezone(new Date(), req.session.userProfile.Timezone)
		};

		const doc = await DocumentUpload.update(documentUpload, {
			where: {
				id: req.body.id
			}
		});
		if (doc) {
			return ({ status: 200, message: 'Success', data: doc });
		}
		else {
			return ({ status: 500, message: 'Error' });
		}
	}
	catch (err) {
        return ({status: 500, message: err});
    }
};

exports.findDocumentUploadByUserProfileId = async (req, res) => {
	const finddata = await DocumentUpload.findAll({
		include: [{ model: HrModuleType }],
		where: { Personal_Detail_Id: req.body.personalDetailId }
	});
	if (finddata) {
		return ({ status: 200, message: 'Success', data: finddata });
	}
	else {
		return ({ status: 500, message: 'Unsuccess', data: [] });
	}
};

exports.createBankDetail = async (req, res) => {
	try {
		if (!req.body.personalDetailId && !req.body.iban) {
			return ({status:400,
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
			CreatedAt: dateformatehelper.convertdatetoothertimezone(new Date(), req.session.userProfile.Timezone)
		};

		const bd = await BankDetail.create(bankDetail);
		if (bd) {
			return ({ status: 200, message: 'Success', data: bd });
		}
		else {
			return ({ status: 500, message: 'Error while fetching data or record not found' });
		}
	}
	catch (err) {
		return ({status: 500, message: err});
	}
};

exports.updateBankDetail = async (req, res) => {
	try {
		if (!req.body.personalDetailId && !req.body.iban) {
			return ({status:400,
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
			UpdatedAt: dateformatehelper.convertdatetoothertimezone(new Date(), req.session.userProfile.Timezone)
		};

		const bd = await BankDetail.update(bankDetail, {
			where: {
				id: req.body.id
			}
		});
		if (bd) {
			return ({ status: 200, message: 'Success', data: bd });
		}
		else {
			return ({ status: 500, message: 'Error while fetching data or record not found' });
		}
	}
	catch (err) {
		return ({status: 500, message: err});
	}
};

exports.findBankDetailByUserProfileId = async (req, res) => {
    if(!req.body.personalDetailId){
        return ({status: 400, message: "required field cannot be empty"})
    }
	const finddata = await BankDetail.findOne({ where: { Personal_Detail_Id: req.body.personalDetailId } });
	if (finddata) {
		return ({ status: 200, message: 'Success', data: finddata });
	} else {
		return ({ status: 500, message: 'Unsuccess', data: [] });
	}
};

exports.createLifeInsurance = async (req, res) => {
	try {
		if (!req.body.personalDetailId || !req.body.policyNumber || !req.body.insuranceProvider) {
			return ({ status:400,
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
			CreatedAt: dateformatehelper.convertdatetoothertimezone(new Date(), req.session.userProfile.Timezone)
		};

		const li = await LifeInsurance.create(lifeInsurance);
		if (li) {
			rreturn ({ status: 200, message: 'Success', data: li });
		}
		else {
			return ({ status: 500, message: 'Error while saving data' });
		}
	}
	catch (err) {
		return ({status:500, message: err});
	}
};

exports.updateLifeInsurance = async (req, res) => {
	try {
		if (!req.body.personalDetailId || !req.body.id || !req.body.insuranceProvider) {
			return ({ status:400,
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
			UpdatedAt: dateformatehelper.convertdatetoothertimezone(new Date(), req.session.userProfile.Timezone)
		};

		const li = await LifeInsurance.update(lifeInsurance, {
			where: {
				id: req.body.id
			}
		});
		if (li) {
			return ({ status: 1, message: 'Success', data: li });
		}
		else {
			return ({ status: 500, message: 'Error while updating record' });
		}
	}
	catch (err) {
		return ({status: 400, message: err});
	}
};

exports.findLifeInsuranceByUserProfileId = async (req, res) => {
	if(!req.body.personalDetailId){
		return ({status: 400, message: "required field cannot be empty"});
	}
	const finddata = await LifeInsurance.findOne({ where: { Personal_Detail_Id: req.body.personalDetailId } });
	if (finddata) {
		return ({ status: 200, message: 'Success', data: finddata });
	} else {
		res.send({ status: 400, message: 'Unsuccess: record not found', data: [] });
	}
};
