const hremp = require("../../Services/EmployeeProfiling/EmployeeProfilingService");
const hrlookup = require("../../Services/EmployeeProfiling/LookupService");

exports.findAllPersonalDetails = async (req, res) => {
    const response = await hremp.findAllPersonalDetails(req,res);
    res.send(response);
}

exports.findPersonalDetailsByUserProfileId = async (req, res) => {
    const response = await hremp.findPersonalDetailsByUserProfileId(req,res);
    res.send(response);
}

exports.findPersonalDetailsByEmployeeId = async (req, res) => {
    const response = await hremp.findPersonalDetailsByEmployeeId(req,res);
    res.send(response);
}

exports.updatePersonalDetails = async (req, res) => {
    const response = await hremp.updatePersonalDetails(req,res);
    res.send(response);
}

exports.createPersonalDetails = async (req, res) => {
    const response = await hremp.createPersonalDetails(req,res);
    res.send(response);
}

exports.createCompany = async (req, res) => {
    const response = await hremp.createCompany(req,res);
    res.send(response);
}

exports.updateCompany = async (req, res) => {
    const response = await hremp.updateCompany(req,res);
    res.send(response);
}

exports.findCompanyByUserProfileId = async (req, res) => {
    const response = await hremp.findCompanyByUserProfileId(req,res);
    res.send(response);
}

exports.createFamilyInformation = async (req, res) => {
    const response = await hremp.createFamilyInformation(req,res);
    res.send(response);
}

exports.updateFamilyInformation = async (req, res) => {
    const response = await hremp.updateFamilyInformation(req,res);
    res.send(response);
}

exports.findFamilyInformationByUserProfileId = async (req, res) => {
    const response = await hremp.findFamilyInformationByUserProfileId(req,res);
    res.send(response);
}

exports.updateExperience = async (req, res) => {
    const response = await hremp.updateExperience(req,res);
    res.send(response);
}

exports.createExperience = async (req, res) => {
    const response = await hremp.createExperience(req,res);
    res.send(response);
}

exports.findExperienceByUserProfileId = async (req, res) => {
    const response = await hremp.findExperienceByUserProfileId(req,res);
    res.send(response);
}

exports.createAcademic = async (req, res) => {
    const response = await hremp.createAcademic(req,res);
    res.send(response);
}

exports.updateAcademic = async (req, res) => {
    const response = await hremp.updateAcademic(req,res);
    res.send(response);
}

exports.findAcademicByUserProfileId = async (req, res) => {
    const response = await hremp.findAcademicByUserProfileId(req,res);
    res.send(response);
}


exports.createProfessionalReference = async (req, res) => {
    const response = await hremp.createProfessionalReference(req,res);
    res.send(response);
}

exports.updateProfessionalReference = async (req, res) => {
    const response = await hremp.updateProfessionalReference(req,res);
    res.send(response);
}

exports.findProfessionalReferenceByUserProfileId = async (req, res) => {
    const response = await hremp.findProfessionalReferenceByUserProfileId(req,res);
    res.send(response);
}

exports.createContactDetails = async (req, res) => {
    const response = await hremp.createContactDetails(req,res);
    res.send(response);
}

exports.updateContactDetails = async (req, res) => {
    const response = await hremp.updateContactDetails(req,res);
    res.send(response);
}

exports.findContactDetailsByUserProfileId = async (req, res) => {
    const response = await hremp.findContactDetailsByUserProfileId(req,res);
    res.send(response);
}

exports.createDocumentUpload = async (req, res) => {
    const response = await hremp.createDocumentUpload(req,res);
    res.send(response);
}

exports.updateDocumentUpload = async (req, res) => {
    const response = await hremp.updateDocumentUpload(req,res);
    res.send(response);
}

exports.findDocumentUploadByUserProfileId = async (req, res) => {
    const response = await hremp.findDocumentUploadByUserProfileId(req,res);
    res.send(response);
}

exports.createBankDetail = async (req, res) => {
    const response = await hremp.createBankDetail(req,res);
    res.send(response);
}

exports.updateBankDetail = async (req, res) => {
    const response = await hremp.updateBankDetail(req,res);
    res.send(response);
}

exports.createLifeInsurance = async (req, res) => {
    const response = await hremp.createLifeInsurance(req,res);
    res.send(response);
}

exports.updateLifeInsurance = async (req, res) => {
    const response = await hremp.updateLifeInsurance(req,res);
    res.send(response);
}

exports.findLifeInsuranceByUserProfileId = async (req, res) => {
    const response = await hremp.findLifeInsuranceByUserProfileId(req,res);
    res.send(response);
}

exports.findBankDetailByUserProfileId = async (req, res) => {
    const response = await hremp.findBankDetailByUserProfileId(req,res);
    res.send(response);
}

exports.getAllHrLookUps = async (req, res) => {
    const response = await hrlookup.getAllHrLookUps(req,res);
    res.send(response);
}

exports.createBusinessUnit = async (req, res) => {
    const response = await hrlookup.createBusinessUnit(req,res);
    res.send(response);
}
exports.createCampaign = async (req, res) => {
    const response = await hrlookup.createCampaign(req,res);
    res.send(response);
}
exports.createCompanyDomain = async (req, res) => {
    const response = await hrlookup.createCompanyDomain(req,res);
    res.send(response);
}
exports.createCostCenter = async (req, res) => {
    const response = await hrlookup.createCostCenter(req,res);
    res.send(response);
}
exports.createCompany = async (req, res) => {
    const response = await hrlookup.createCompany(req,res);
    res.send(response);
}
exports.createDepartment = async (req, res) => {
    const response = await hrlookup.createDepartment(req,res);
    res.send(response);
}
exports.createDesignation = async (req, res) => {
    const response = await hrlookup.createDesignation(req,res);
    res.send(response);
}
exports.createGroup = async (req, res) => {
    const response = await hrlookup.createGroup(req,res);
    res.send(response);
}
exports.createHrModuleType = async (req, res) => {
    const response = await hrlookup.createHrModuleType(req,res);
    res.send(response);
}
exports.createHrSeparationStatus = async (req, res) => {
    const response = await hrlookup.createHrSeparationStatus(req,res);
    res.send(response);
}
exports.createJobCategory = async (req, res) => {
    const response = await hrlookup.createJobCategory(req,res);
    res.send(response);
}
exports.createLeaveRequestType = async (req, res) => {
    const response = await hrlookup.createLeaveRequestType(req,res);
    res.send(response);
}
exports.createLocation = async (req, res) => {
    const response = await hrlookup.createLocation(req,res);
    res.send(response);
}
exports.createQualification = async (req, res) => {
    const response = await hrlookup.createQualification(req,res);
    res.send(response);
}
exports.createReason = async (req, res) => {
    const response = await hrlookup.createReason(req,res);
    res.send(response);
}


exports.createRelationship = async (req, res) => {
    const response = await hrlookup.createRelationship(req,res);
    res.send(response);
}
exports.createRequestStatus = async (req, res) => {
    const response = await hrlookup.createRequestStatus(req,res);
    res.send(response);
}
exports.createRequisitionNumber = async (req, res) => {
    const response = await hrlookup.createRequisitionNumber(req,res);
    res.send(response);
}
exports.createTerminationType = async (req, res) => {
    const response = await hrlookup.createTerminationType(req,res);
    res.send(response);
}
exports.createGender = async (req, res) => {
    const response = await hrlookup.createGender(req,res);
    res.send(response);
}
exports.findAllGender = async (req, res) => {
    const response = await hrlookup.findAllGender(req,res);
    res.send(response);
}
exports.createTimezone = async (req, res) => {
    const response = await hrlookup.createTimezone(req,res);
    res.send(response);
}
exports.getAllTimezone = async (req, res) => {
    const response = await hrlookup.getAllTimezone(req,res);
    res.send(response);
}
exports.findAllTimezone = async (req, res) => {
    const response = await hrlookup.findAllTimezone(req,res);
    res.send(response);
}

exports.findAllCompany = async (req, res) => {
    const response = await hrlookup.findAllCompany(req,res);
    res.send(response);
}

exports.findLocationByCompanyId = async (req, res) => {
    const response = await hrlookup.findLocationByCompanyId(req,res);
    res.send(response);
}

exports.findDepartmentByCompanyId = async (req, res) => {
    const response = await hrlookup.findDepartmentByCompanyId(req,res);
    res.send(response);
}

exports.findPersonalDetailsByDepartmentId = async (req, res) => {
    const response = await hremp.findPersonalDetailsByDepartmentId(req,res);
    res.send(response);
}
