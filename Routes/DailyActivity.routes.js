var express = require('express');
const router = express.Router();

const hrattendance = require("../controllers/hr/dailyactivity.controller");
const userHelper = require('../Middleware/userprofile');


router.post("/createShift", userHelper.getUserTimezone, hrattendance.createShift);
router.post("/updateShiftRequest", userHelper.getUserTimezone, hrattendance.updateShiftRequest);
router.post("/findAllShift", hrattendance.findAllShift);
router.post("/findShiftByShiftId", hrattendance.findShiftByShiftId);
router.post("/createUserShift", userHelper.getUserTimezone, hrattendance.createUserShift);
router.post("/createShiftWeeks", userHelper.getUserTimezone, hrattendance.createShiftWeeks);
router.post("/updateUserShift", userHelper.getUserTimezone, hrattendance.updateUserShift);

router.post("/createClockInOut", userHelper.getUserTimezone, hrattendance.createClockInOut);
router.post("/updateClockInOut", userHelper.getUserTimezone, hrattendance.updateClockInOut);
router.post("/findAllClockInOut", hrattendance.findAllClockInOut);
router.post("/findClockInOutByProfileId", userHelper.getUserTimezone,hrattendance.findClockInOutByProfileId);
router.post("/findClockInOutRange", hrattendance.findClockInOutRange);
module.exports = router;