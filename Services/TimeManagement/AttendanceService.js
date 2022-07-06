
const AttendanceRepo = require("../../Repository/TimeManagement/AttendanceRepo");
const { getClockInOutByIdResponseDTO, getClockInOutResponseDTO } = require('../../DataTransferObjects/clockinoutDto');
const { getShiftByIdResponseDTO, getShiftResponseDTO } = require('../../DataTransferObjects/shiftDto');
const { getShiftWeekResponseDTO } = require('../../DataTransferObjects/shiftWeekDto');
exports.createTimeAdjustmentRequest = async (req, res) => {
    const response = await AttendanceRepo.createTimeAdjustmentRequest(req,res);
    return (response);
}

exports.updateTimeAdjustmentRequest = async (req, res) => {
    const response = await AttendanceRepo.updateTimeAdjustmentRequest(req,res);
    return (response);
}

exports.findTimeAdjustmentByUserProfileId = async (req, res) => {
    const response = await AttendanceRepo.findTimeAdjustmentByUserProfileId(req,res);
    return (response);
}

exports.findAllTimeAdjustment = async (req, res) => {
    const response = await AttendanceRepo.findAllTimeAdjustment(req,res);
    return (response);
}

exports.createShift = async (req, res) => {
    const response = await AttendanceRepo.createShift(req,res);
    const dtoobject = await getShiftByIdResponseDTO(response.data);
    return (dtoobject);
}

exports.updateShiftRequest = async (req, res) => {
    const response = await AttendanceRepo.updateShiftRequest(req,res);
    const dtoobject = await getShiftByIdResponseDTO(response.data);
    return (dtoobject);
}

exports.createShiftWeeks = async (req, res) => {
    const response = await AttendanceRepo.createShiftWeeks(req,res);
    const dtoobject = await getShiftWeekResponseDTO(response.data[0]);
    return (response);
}

exports.updateShiftWeeks = async (req, res) => {
    const response = await AttendanceRepo.updateShiftWeeks(req,res);
   
    return (response);
}

exports.createUserShift = async (req, res) => {
    const response = await AttendanceRepo.createUserShift(req,res);
    return (response);
}

exports.updateUserShift = async (req, res) => {
    const response = await AttendanceRepo.updateUserShift(req,res);
    return (response);
}

exports.findAllShift = async (req, res) => {
    const response = await AttendanceRepo.findAllShift(req,res);
    const dtoobject = await getShiftResponseDTO(response.data);
    console.log(dtoobject)
    return (response);
}

exports.findShiftByShiftId = async (req, res) => {
    const response = await AttendanceRepo.findShiftByShiftId(req,res);
    return (response);
}

exports.findUserShifts = async (req, res) => {
    const response = await AttendanceRepo.findUserShifts(req,res);
    return (response);
}

exports.createClockInOut = async (req, res) => {
    const response = await AttendanceRepo.createClockInOut(req,res);
    const dtoobject = await getClockInOutByIdResponseDTO(response.data);
    return (dtoobject);
}

exports.updateClockInOut = async (req, res) => {
    const response = await AttendanceRepo.updateClockInOut(req,res);
    const dtoobject = await getClockInOutByIdResponseDTO(response.data);
    return (dtoobject);
}

exports.findAllClockInOut = async (req, res) => {
    const response = await AttendanceRepo.findAllClockInOut(req,res);
    const dtoobject = await getClockInOutResponseDTO(response.data, req.body.pageIndex, req.body.size, response.totalRecords);
    return (dtoobject);
}

exports.findClockInOutByProfileId = async (req, res) => {
    const response = await AttendanceRepo.findClockInOutByProfileId(req,res);
    const dtoobject = await getClockInOutResponseDTO(response.data, req.body.pageIndex, req.body.size, response.totalRecords);
    return (response);
}

exports.findClockInOutRange = async (req, res) => {
    const response = await AttendanceRepo.findClockInOutRange(req,res);
    return (response);
}
