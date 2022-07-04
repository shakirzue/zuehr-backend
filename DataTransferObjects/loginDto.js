const { getPaginationInfo } = require('../helpers/paginationhelper');
const hrlookup = require("../Services/EmployeeProfiling/LookupService");
const getLoginDTO = async (loginDetail) => ({
  id: loginDetail.id,
  Timezone: await getTimezone(loginDetail.Timezone),
  EmployeeNumber:loginDetail.EmployeeNumber,
  Email:loginDetail.Email,
  Password:loginDetail.Password,
  IsPasswordReset:loginDetail.IsPasswordReset
});

const getTimezone = async (id)=>{ 
  const {data} =await hrlookup.getAllTimezone();
  return data.filter(x=>x.id === parseInt(id))[0].Description;
}

exports.getLoginDetailByIdResponseDTO = async (loginDetail) => ({
  data: await getLoginDTO(loginDetail),
});

exports.getLoginDetailResponseDTO = async (loginDetail, page = 0, limit =0, count =0) => ({
  data:await Promise.all(loginDetail.map(getLoginDTO)).then(function(results) {
    return results;
}),
  pagination: getPaginationInfo(page, limit, count),
});