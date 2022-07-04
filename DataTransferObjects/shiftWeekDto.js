const { getPaginationInfo } = require('../helpers/paginationhelper');
const hremp = require("../Services/EmployeeProfiling/EmployeeProfilingService");
const hrlookup = require("../Services/EmployeeProfiling/LookupService");

const getShiftDTO = async (Shift) => ({
  id: Shift.id,
  ShiftId: Shift.Shift_Id,
  DayType:Shift.DayType,
  Day:Shift.Day,
  StartTime: Shift.StartTime,
  StartTime: Shift.EndTime,
  BreakDuration: Shift.BreakDuration,
  FlexiIn: Shift.FlexiIn,
  FlexiOut: Shift.FlexiOut,
  CreatedBy:Shift.CreatedBy  
  
});

const getCompany = async (id)=>{ 
  const {data} =await hremp.findCompanyByUserProfileId();
  return data.filter(x=>x.id ===id)[0].Description;
}

const getTimezone = async (id)=>{ 
  const {data} =await hrlookup.getAllTimezone();
  return data.filter(x=>x.id === parseInt(id))[0].Description;
}

exports.getShiftWeekByIdResponseDTO = async (Shift) => ({
  data: await getShiftDTO(Shift),
});

exports.getShiftWeekResponseDTO = async (Shift, page=0, limit=0, count=0) => ({
  data:await Promise.all(Shift.Weeks.map(getShiftDTO)).then(function(results) {
    return results;
}),
  pagination: getPaginationInfo(page, limit, count),
});