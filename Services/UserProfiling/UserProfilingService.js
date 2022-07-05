const EmployeeRepo = require("../../Repository/EmployeeProfiling/EmployeeRepo");
const AttendanceRepo = require("../../Repository/TimeManagement/AttendanceRepo");
const UserProfileRepo = require("../../Repository/UserProfiling/UserProfileRepo");
const { getLoginDetailByIdResponseDTO, getLoginDetailResponseDTO } = require('../../DataTransferObjects/loginDto');

exports.getSingleUserProfile = async (req, res) => {
    const response = await UserProfileRepo.getSingleUserProfile(req,res);
    const dtoobject = await getLoginDetailByIdResponseDTO(response.data);
    return (dtoobject);
}

exports.getUserProfile = async (req, res) => {
    const response = await UserProfileRepo.getUserProfile(req,res);
    const dtoobject = await getLoginDetailByIdResponseDTO(response.data);
    return (dtoobject);
}

exports.deleteUserProfile = async (req, res) => {
    const response = await UserProfileRepo.deleteUserProfile(req,res);
    return (response);
}

exports.registerNonCpcgrUserProfile = async (req, res) => {
    const response = await UserProfileRepo.registerNonCpcgrUserProfile(req,res);
    const dtoobject = await getLoginDetailByIdResponseDTO(response.data);
    return (response);
}

exports.registerUserProfile = async (req, res) => {
    const response = await UserProfileRepo.registerUserProfile(req,res);
    const dtoobject = await getLoginDetailByIdResponseDTO(response.data);
    return (response);
}

exports.loginNonCpcgrUserProfile = async (req, res) => {
    const response = await UserProfileRepo.loginNonCpcgrUserProfile(req,res);
    const dtoobject = await getLoginDetailByIdResponseDTO(response.data);
    return (dtoobject);
}

exports.forgotPasswordRequest = async (req, res) => {
    const response = await UserProfileRepo.forgotPasswordRequest(req,res);
    return (response);
}

exports.resetPasswordRequest = async (req, res) => {
    const response = await UserProfileRepo.resetPasswordRequest(req,res);
    return (response);
}

exports.changePasswordRequest = async (req, res) => {
    const response = await UserProfileRepo.changePasswordRequest(req,res);
    return (response);
}

exports.passwordResetVerify = async (req, res) =>{
    const response = await UserProfileRepo.passwordResetVerify(req,res);
    return (response);
}