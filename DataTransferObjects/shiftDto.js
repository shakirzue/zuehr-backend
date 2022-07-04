const { getPaginationInfo } = require('../helpers/paginationhelper');
const hremp = require("../Services/EmployeeProfiling/EmployeeProfilingService");
const hrlookup = require("../Services/EmployeeProfiling/LookupService");

const getShiftDTO = async (Shift) => ({
  id: Shift.id,
  Company: Shift.Company_Id,
  ShiftName:Shift.Shift_Name,
  Description:Shift.Description,
  Timezone:await getTimezone(Shift.Timezone_Id),
  
  
});

const getCompany = async (id)=>{ 
  const {data} =await hremp.findCompanyByUserProfileId();
  return data.filter(x=>x.id ===id)[0].Description;
}

const getTimezone = async (id)=>{ 
  const {data} =await hrlookup.getAllTimezone();
  return data.filter(x=>x.id === parseInt(id))[0].Description;
}

exports.getShiftByIdResponseDTO = async (Shift) => ({
  data: await getShiftDTO(Shift),
});

exports.getShiftResponseDTO = async (Shift, page=0, limit=0, count=0) => ({
  data:await Promise.all(Shift.map(getShiftDTO)).then(function(results) {
    return results;
}),
  pagination: getPaginationInfo(page, limit, count),
});