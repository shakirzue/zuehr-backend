const hrattendance = require("../../Services/TimeManagement/AttendanceService");
const hrlookup = require("../../Services/EmployeeProfiling/LookupService");

exports.createShift = async (req, res) => {
    const response = await hrattendance.createShift(req,res);
    res.send(response);
}

exports.updateShiftRequest = async (req, res) => {
    const response = await hrattendance.updateShiftRequest(req,res);
    res.send(response);
}

exports.createShiftWeeks = async (req, res) => {
    const response = await hrattendance.createShiftWeeks(req,res);
    res.send(response);
}

exports.updateShiftWeeks = async (req, res) => {
    const response = await hrattendance.updateShiftWeeks(req,res);
    res.send(response);
}

exports.createUserShift = async (req, res) => {
    const response = await hrattendance.createUserShift(req,res);
    res.send(response);
}

exports.updateUserShift = async (req, res) => {
    const response = await hrattendance.updateUserShift(req,res);
    const dtoobject = await getLoginDetailByIdResponseDTO(response.data);
    res.send(response);
}

exports.findAllShift = async (req, res) => {
    const response = await hrlookup.findAllShift(req,res);
    res.send(response);
}

exports.findShiftByShiftId = async (req, res) => {
    const response = await hrattendance.findShiftByShiftId(req,res);
    res.send(response);
}

exports.findUserShifts = async (req, res) => {
    const response = await hrattendance.findUserShifts(req,res);
    res.send(response);
}

exports.createClockInOut = async (req, res) => {
    const response = await hrattendance.createClockInOut(req,res);
    res.send(response);
}

exports.updateClockInOut = async (req, res) => {
    const response = await hrattendance.updateClockInOut(req,res);
    res.send(response);
}

exports.findAllClockInOut = async (req, res) => {
    const response = await hrattendance.findAllClockInOut(req,res);
    res.send(response);
}

exports.findClockInOutByProfileId = async (req, res) => {
    const response = await hrattendance.findClockInOutByProfileId(req,res);
    res.send(response);
}

exports.findClockInOutRange = async (req, res) => {
    const response = await hrattendance.findClockInOutRange(req,res);
    res.send(response);
}
