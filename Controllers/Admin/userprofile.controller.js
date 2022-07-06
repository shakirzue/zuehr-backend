const hrattendance = require("../../Services/UserProfiling/UserProfilingService");
const hrlookup = require("../../Services/EmployeeProfiling/LookupService");

exports.getSingleUserProfile = async (req, res) => {
    const response = await hrattendance.getSingleUserProfile(req,res);
    res.send(response);
}

exports.getUserProfile = async (req, res) => {
    const response = await hrattendance.getUserProfile(req,res);
    res.send(response);
}

// exports.getSingleUserProfile = async (req, res) => {
//     const response = await hrattendance.getUserProfile(req,res);
//     res.send(response);
// }

exports.deleteUserProfile = async (req, res) => {
    const response = await hrattendance.deleteUserProfile(req,res);
    res.send(response);
}

exports.registerNonCpcgrUserProfile = async (req, res) => {
    const response = await hrattendance.registerNonCpcgrUserProfile(req,res);
    res.send(response);
}

exports.registerUserProfile = async (req, res) => {
    const response = await hrattendance.registerUserProfile(req,res);
    res.send(response);
}

exports.loginNonCpcgrUserProfile = async (req, res) => {
    const response = await hrattendance.loginNonCpcgrUserProfile(req,res);
    res.send(response);
}

exports.forgotPasswordRequest = async (req, res) => {
    const response = await hrattendance.forgotPasswordRequest(req,res);
    res.send(response);
}

exports.resetPasswordRequest = async (req, res) => {
    const response = await hrlookup.resetPasswordRequest(req,res);
    res.send(response);
}

exports.changePasswordRequest = async (req, res) => {
    const response = await hrattendance.changePasswordRequest(req,res);
    res.send(response);
}

exports.passwordResetVerify = async (req, res) => {
    const response = await hrattendance.passwordResetVerify(req,res);
    res.send(response);
}