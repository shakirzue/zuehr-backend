const { getPaginationInfo } = require('../helpers/paginationhelper');
const hremp = require("../Services/EmployeeProfiling/EmployeeProfilingService");
const getClockInOutDTO = async (ClockInOut) => ({
  id: ClockInOut.id,
  EmployeeNumber: await getEmployeeName(ClockInOut.Personal_Detail_Id),
  DateClockIn:ClockInOut.Date_Clock_In,
  DateClockOut:ClockInOut.Date_Clock_Out,
  ClockIn:ClockInOut.Clock_In,
  ClockOut:ClockInOut.Clock_Out,
  ClockDifference:ClockInOut.Clock_Difference,
  Latitude:ClockInOut.Latitude,
  Longitude:ClockInOut.Longitude,
  IsMachineRequest:ClockInOut.IsMachineRequest
});

const getEmployeeName = async (id)=>{
  var req = {body:{id: id}};
  const {data} =await hremp.findPersonalDetailsById(req);
  return data.EmployeeNumber;
}

exports.getClockInOutByIdResponseDTO = async (ClockInOut) => ({
  data: await getClockInOutDTO(ClockInOut),
});

exports.getClockInOutResponseDTO = async (ClockInOut, page=0, limit=0, count=0) => ({
  data:await Promise.all(ClockInOut.map(getClockInOutDTO)).then(function(results) {
    return results;
}),
  pagination: getPaginationInfo(page, limit, count),
});