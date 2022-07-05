const EmployeeRepo = require("../../Repository/EmployeeProfiling/EmployeeRepo");
const AttendanceRepo = require("../../Repository/TimeManagement/AttendanceRepo");
const { getPersonalDetailResponseDTO, getPersonalDetailByIdResponseDTO } = require('../../DataTransferObjects/personaldetailDto');
exports.findAllPersonalDetails = async (req, res) => {
    const response = await EmployeeRepo.findAllPersonalDetails(req,res);
    const dtoobject = await getPersonalDetailResponseDTO(response.data, req.body.pageIndex, req.body.size, response.totalRecords);
    return (dtoobject);
}

exports.findPersonalDetailsByUserProfileId = async (req, res) => {
    const response = await EmployeeRepo.findPersonalDetailsByUserProfileId(req,res);
    const dtoobject = await getPersonalDetailByIdResponseDTO(response.data)
    return (response);
}

exports.findPersonalDetailsById = async (req, res) => {
    const response = await EmployeeRepo.findPersonalDetailsById(req,res);
    const dtoobject = await getPersonalDetailByIdResponseDTO(response.data)
    return (response);
}

exports.findPersonalDetailsByEmployeeId = async (req, res) => {
    const response = await EmployeeRepo.findPersonalDetailsByEmployeeId(req,res);
    const dtoobject = await getPersonalDetailByIdResponseDTO(response.data)
    return (dtoobject);
}

exports.updatePersonalDetails = async (req, res) => {
    const response = await EmployeeRepo.updatePersonalDetails(req,res);
    const dtoobject = await getPersonalDetailByIdResponseDTO(response.data)
    return (dtoobject);
}

exports.createPersonalDetails = async (req, res) => {
    const response = await EmployeeRepo.createPersonalDetails(req,res);
    console.log(response)
    const dtoobject = await getPersonalDetailByIdResponseDTO(response.data)
    return (dtoobject);
}

exports.createCompany = async (req, res) => {
    const response = await EmployeeRepo.createCompany(req,res);
    return (response);
}

exports.updateCompany = async (req, res) => {
    const response = await EmployeeRepo.updateCompany(req,res);
    return (response);
}

exports.findCompanyByUserProfileId = async (req, res) => {
    const response = await EmployeeRepo.findCompanyByUserProfileId(req,res);
    return (response);
}

exports.createFamilyInformation = async (req, res) => {
    const response = await EmployeeRepo.createFamilyInformation(req,res);
    return (response);
}

exports.updateFamilyInformation = async (req, res) => {
    const response = await EmployeeRepo.updateFamilyInformation(req,res);
    return (response);
}

exports.findFamilyInformationByUserProfileId = async (req, res) => {
    const response = await EmployeeRepo.findFamilyInformationByUserProfileId(req,res);
    return (response);
}

exports.findPersonalDetailsByDepartmentId = async (req, res) => {
    const response = await EmployeeRepo.findPersonalDetailsByDepartmentId(req,res);
    return (response);
}

exports.updateExperience = async (req, res) => {
    const response = await EmployeeRepo.updateExperience(req,res);
    return (response);
}

exports.createExperience = async (req, res) => {
    const response = await EmployeeRepo.createExperience(req,res);
    return (response);
}

exports.findExperienceByUserProfileId = async (req, res) => {
    const response = await EmployeeRepo.findExperienceByUserProfileId(req,res);
    return (response);
}

exports.createAcademic = async (req, res) => {
    const response = await EmployeeRepo.createAcademic(req,res);
    return (response);
}

exports.updateAcademic = async (req, res) => {
    const response = await EmployeeRepo.updateAcademic(req,res);
    return (response);
}

exports.findAcademicByUserProfileId = async (req, res) => {
    const response = await EmployeeRepo.findAcademicByUserProfileId(req,res);
    return (response);
}

exports.createProfessionalReference = async (req, res) => {
    const response = await EmployeeRepo.createProfessionalReference(req,res);
    return (response);
}

exports.updateProfessionalReference = async (req, res) => {
    const response = await EmployeeRepo.updateProfessionalReference(req,res);
    return (response);
}

exports.findProfessionalReferenceByUserProfileId = async (req, res) => {
    const response = await EmployeeRepo.findProfessionalReferenceByUserProfileId(req,res);
    return (response);
}

exports.createContactDetails = async (req, res) => {
    const response = await EmployeeRepo.createContactDetails(req,res);
    return (response);
}

exports.updateContactDetails = async (req, res) => {
    const response = await EmployeeRepo.updateContactDetails(req,res);
    return (response);
}

exports.findContactDetailsByUserProfileId = async (req, res) => {
    const response = await EmployeeRepo.findContactDetailsByUserProfileId(req,res);
    return (response);
}

exports.createDocumentUpload = async (req, res) => {
    const response = await EmployeeRepo.createDocumentUpload(req,res);
    return (response);
}

exports.updateDocumentUpload = async (req, res) => {
    const response = await EmployeeRepo.updateDocumentUpload(req,res);
    return (response);
}

exports.findDocumentUploadByUserProfileId = async (req, res) => {
    const response = await EmployeeRepo.findDocumentUploadByUserProfileId(req,res);
    return (response);
}

exports.createBankDetail = async (req, res) => {
    const response = await EmployeeRepo.createBankDetail(req,res);
    return (response);
}

exports.updateBankDetail = async (req, res) => {
    const response = await EmployeeRepo.updateBankDetail(req,res);
    return (response);
}

exports.findBankDetailByUserProfileId = async (req, res) => {
    const response = await EmployeeRepo.findBankDetailByUserProfileId(req,res);
    return (response);
}

exports.createLifeInsurance = async (req, res) => {
    const response = await EmployeeRepo.createLifeInsurance(req,res);
    return (response);
}

exports.updateLifeInsurance = async (req, res) => {
    const response = await EmployeeRepo.updateLifeInsurance(req,res);
    return (response);
}

exports.findLifeInsuranceByUserProfileId = async (req, res) => {
    const response = await EmployeeRepo.findLifeInsuranceByUserProfileId(req,res);
    return (response);
}