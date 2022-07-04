///CRUD operation will go here
///Add reference of model/index.js
///It can be referenced by controller and server files
///helpers can be referenced here
///Can be directly called by controllers
const { QueryTypes } = require('sequelize');
const path = require('path');
const { sequelize } = require("../../models");
const db = require("../../models");
const Op = db.Sequelize.Op;

const dateformatehelper = require('../../helpers/datehelper');
const timeZoneType = require('../../helpers/TimeZoneTypes');
const mischelper = require('../../helpers/mischelper');
const userprofilehelper = require('../../helpers/userprofilehelper');

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

exports.createTimeAdjustmentRequest = async (req, res) => {
	try {
		if (!req.body.reasonId || !req.body.personalDetailId) {
			return ({ status: 400,
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
			CreatedAt: dateformatehelper.convertdatetoothertimezone(new Date(), req.session.userProfile.Timezone)
		};

		const ta = await TimeAdjustment.create(timeAdjustment);

		if (ta) {
			return ({ status: 200, message: 'Success', data: ta });
		}
		else {
			return ({ status: 500, message: 'Error while fetching data or record not found' });
		}
	}
	catch (err) {
		return ({ status: 500, message: err});
	}
};

exports.updateTimeAdjustmentRequest = async (req, res) => {
	try {
		if (!req.body.personalDetailId) {
			return ({status: 400,
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
			UpdatedAt: dateformatehelper.convertdatetoothertimezone(new Date(), req.session.userProfile.Timezone)
		};
		const ta = await TimeAdjustment.update(timeAdjustment, {
			where: {
				id: req.body.id
			}
		});
		if (com) {
			return ({ status: 200, message: 'Success', data: ta });
		}
		else {
			return ({ status: 500, message: 'Error while fetching data or no record' });
		}
	}
	catch (err) {
		return ({ status: 500, message: err});
	}
};

exports.findTimeAdjustmentByUserProfileId = async (req, res) => {
	if(!req.body.personalDetailId){
        return ({status: 400, message: "required field cannot be empty"});
    }
    const finddata = await TimeAdjustment.findOne({ where: { CreatedBy: req.body.personalDetailId } });
	if (finddata) {
		return ({ status: 200, message: 'Success', data: finddata });
	} else {
		return ({ status: 500, message: 'Unsuccess', data: [] });
	}
};

exports.findAllTimeAdjustment = async (req, res) => {
	var finddata = null;
	var totalRecords = 0;
	await TimeAdjustment.findAndCountAll({
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
		return ({ status: 500, message: 'Unsuccess', data: [] });
	}
};

exports.createShift = async (req, res) => {
	try {
		if (!req.body.userProfileId && req.body.userProfileId <= 0) {
			return ({status:400,
				message: "Content can not be empty!"
			});
			//return;
		}

		var response = [];
		var shiftObj = [];
		var Weeks = [];
		const shiftRecord = {
			// Group_Id: req.body.groupId,
			 Company_Id: req.body.companyId,
			Shift_Name: req.body.name,
			Description: req.body.description,
			Timezone_Id: req.body.timezoneId,
			CreatedBy: req.body.userProfileId,
			CreatedAt: dateformatehelper.convertdatetoothertimezone(new Date(), req.session.userProfile.Timezone)
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
			return ({ status: 200, message: 'Success', data: shift });
		}
		else {
			return ({ status: 500, message: 'Error while fetching data or no record found' });
		}
	}
	catch (err) {		
		return ({ status: 500, message: err});
	}
};

exports.updateShiftRequest = async (req, res) => {
	try {
		if (!req.body.userProfileId || req.body.userProfileId <= 0 || req.body.id <= 0) {
			return ({status:400,
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
			Timezone_Id: req.body.timezoneId,
			UpdatedAt: dateformatehelper.convertdatetoothertimezone(new Date(), req.session.userProfile.Timezone)
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
			return ({ status: 1, message: 'Success', data: response });
		}
		else {
			return ({ status: 0, message: 'Error while ' });
		}
	}
	catch (err) {
		return ({status:400, message: err});
	}
};

exports.createShiftWeeks = async (req, res) => {
	try {
		if (!req.body.shiftId || req.body.shiftId === '0') {
			return ({ status: 400,
				message: "Content can not be empty!"
			});
			return;
		}
		//var response = [];
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
				CreatedAt: dateformatehelper.convertdatetoothertimezone(new Date(), req.session.userProfile.Timezone)
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

		//await response.push(shiftObj);
		if (shiftObj) {
			return ({ status: 200, message: 'Success', data: shiftObj });
		}
		else {
			return ({ status: 500, message: 'Error' });
		}
	}
	catch (err) {
		return ({ status: 500, message: err});
	}
};

exports.updateShiftWeeks = async (req, res) => {
	try {
		if (!req.body.shiftId || req.body.shiftId <= 0 || !req.body.weeks) {
			return ({status:400,
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
				UpdatedAt: dateformatehelper.convertdatetoothertimezone(new Date(), req.session.userProfile.Timezone)
			};
			const wd = await ShiftWeekDetail.update(weekdetail, { where: { Id: week.id } });
			Weeks.push(wd);
		};
		response.push(Weeks);
		if (response) {
			return ({ status: 200, message: 'Success', data: response });
		}
		else {
			return ({ status: 500, message: 'Error while fetching data or record not found' });
		}
	}
	catch (err) {
		return ({ status: 500, message: err});
	}
};

exports.createUserShift = async (req, res) => {
	try {
		if (!req.body.shiftUsers || req.body.shiftUsers.length > 0) {
			return ({ status: 400,
				message: "Content can not be empty!"
			});
			return;
		}
		var userShift = [];
		for (const user of req.body.shiftUsers) {
			
			const _usershift = {
				Personal_Detail_Id: user.personalDetailId,
				Shift_Id: user.shiftId,
				FromDate: user.fromDate,
				IsActive: user.isActive,
				// CreatedBy: req.body.userProfileId,
				// CreatedAt: dateformatehelper.convertdatetoothertimezone(new Date(), req.session.userProfile.Timezone)
			};
			const us = await UserShiftLink.create(_usershift);
			userShift.push(us);
		};

		if (userShift) {
			return ({ status: 200, message: 'Success', data: userShift });
		}
		else {
			return ({ status: 500, message: 'Error while fetching data or no record found' });
		}
	}
	catch (err) {
        return ({ status: 500, message: err});
	}
};

exports.updateUserShift = async (req, res) => {
	try {
		if (!req.body.shiftUsers && req.body.shiftUsers.length > 0) {
			return ({ status: 400,
				message: "Content can not be empty!"
			});
			return;
		}
		var userShift = [];
		for (const user of req.body.shiftUsers) {
			
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
			return ({ status: 200, message: 'Success', data: userShift });
		}
		else {
			return ({ status: 500, message: 'Error while fetching data or no record found' });
		}
	}
	catch (err) {
		return ({ status: 500, message: err});
	}
};

exports.findAllShift = async (req, res) => {
	if(!req.body.size || !req.body.pageIndex){
        return ({status: 400, message: "required field connot be empty"})
    }
    var finddata = null;
	var totalRecords = 0;
	await HrShift.findAndCountAll({
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
		return ({ status: 500, message: 'Unsuccess', data: [], totalRecords:0 });
	}
};

exports.findShiftByShiftId = async (req, res) => {
    if(!req.body.shiftId){
        return ({status: 400, message:"required fields cannot be empty"})
    }
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
		return ({ status: 200, message: 'Success', data: finddata });
	} else {
		return ({ status: 500, message: 'Unsuccess', data: [] });
	}
};

exports.findUserShifts = async (req, res) => {
    if(!req.body.personalDetailId){
        return ({status: 400, message:"required fields cannot be empty"})
    }
	const finddata = await UserShiftLink.findAll({
		where: { Personal_Detail_Id: req.body.personalDetailId },
		include: [{ model: HrShift }, { model: ShiftWeekDetail }]
	});
	if (finddata) {
		return ({ status: 200, message: 'Success', data: finddata });
	} else {
		return ({ status: 500, message: 'Unsuccess', data: [] });
	}
};

exports.createClockInOut = async (req, res) => {
	try {
		if (!req.body.clockIn || !req.body.personalDetailId) {
			return ({status: 400,
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
			return ({ status: 400, message: 'cannot clockIn on same day prior to clockout' });
			//return
		}

		var clockInDate = req.body.clockInDate;
		var clockInTime = req.body.clockIn;
		if (req.session && req.session.userProfile && req.body.timeZone != req.session.userProfile.Timezone) {
			let clockInDateTime = dateformatehelper.converttimetoothertimezone(req.body.clockInDate, req.body.clockIn, req.body.timeZone, req.session.userProfile.Timezone);
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
		console.log(420, clockInOut)
		const clock = await ClockInOut.create(clockInOut);
		if (clock) {
			return ({ status: 200, message: 'Success', data: clock });
		}
		else {
			return ({ status: 500, message: 'Error while saving data' });
		}
	}
	catch (err) {
		return ({status: 500, message: err})
	}
};

exports.updateClockInOut = async (req, res) => {
	try {
		if (!req.body.clockOut || !req.body.clockOutDate || !req.body.personalDetailId) {
			return ({status: 400,
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
		if (req.session && req.session.userProfile && req.body.timeZone != req.session.userProfile.Timezone) {
			let clockOutDateTime = dateformatehelper.converttimetoothertimezone(req.body.clockOutDate, req.body.clockOut, req.body.timeZone, req.session.userProfile.Timezone);
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
			return ({ status: 200, message: 'Success', data: clock });
		}
		else {
			return ({ status: 500, message: 'Error while updating data' });
		}
	}
	catch (err) {
		return ({ status: 400, message:err});
	}
};

exports.findAllClockInOut = async (req, res) => {
	if(!req.body.size || !req.body.pageIndex){
        return ({status: 400, message: "required fields cannot be empty"})
    }
    var finddata = null;
	var totalRecords = 0;
	
	await ClockInOut.findAndCountAll({
		limit: req.body.size,
		offset: mischelper.getPagingOffset(req.body.pageIndex, req.body.size)
	})
	.then(result => {
		finddata = result.rows;
		totalRecords = result.count;
	  });
	if (finddata) {
		return ({ status: 200, message: 'Success', data: finddata, totalRecords: totalRecords });
	}
	else{
		return ({ status: 500, message: 'Unsuccess', data: [], totalRecords:0 });
	}
};

exports.findClockInOutByProfileId = async (req, res) => {
	try{	
		let Clock_OutCheck = null;
		if(!req.body.personalDetailId){
			return ({status: 400,
				message: "Content can not be empty!"
			});
			return;
		}
		var clockDetail = await ClockInOut.findOne({
			where: { Date_Clock_In: req.body.clockInDate, Personal_Detail_Id: req.body.personalDetailId, Clock_Out: Clock_OutCheck }
		});
		if (clockDetail) {
			return ({ status: 200, message: 'Success', data: clockDetail });
		}
	}
	catch(err){
		return ({status: 500, message: 'Request failed: '+err, data:{}});
	}
};

exports.findClockInOutRange = async (req, res) => {
	try{
        if(!req.body.userProfileId || !req.body.pageIndex || !req.body.size || !req.body.from_date || !req.body.to_date)
		{
            return ({status: 400, message: "required fields cannot be empty"})
        }
        let filter = {
			where: { User_Profile_Id: req.body.userProfileId }
		}
		const personalDetail = await checkIfEmployeeIdExist(filter)

		let results = await sequelize.query(
			'SELECT * FROM hr.Clock_InOut '+
			'where (convert(DATETIME2, Date_Clock_In, 103) >= convert(DATETIME2,:startDate, 103) ) and (convert(DATETIME2, Date_Clock_Out, 103) <= convert(DATETIME2,:endDate, 103))'+
			' and Personal_Detail_Id = :personalDetailId'+
			' ORDER BY id OFFSET :offset ROWS FETCH NEXT :size ROWS ONLY;',
			{
				replacements: { personalDetailId: personalDetail.id, offset: mischelper.getPagingOffset(req.body.pageIndex, req.body.size), size: req.body.size , startDate: req.body.from_date, endDate: req.body.to_date },
				type: QueryTypes.SELECT
			}
		);

		if (results) {
			return ({ status: 200, message: 'Success', data: results });
		}
	}
	catch(err){
		return ({status: 500, message: 'Request failed: '+err, data:{}});
	}
};
