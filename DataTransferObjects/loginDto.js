const { getPaginationInfo } = require('../helpers/paginationhelper');
const hrlookup = require("../Services/EmployeeProfiling/LookupService");
const getLoginDTO = async (loginDetail) => ({
  id: loginDetail.User_Profile_Id,
  EmployeeNumber:loginDetail.EmployeeNumber,
  Email:loginDetail.Email,
  Password:loginDetail.Password,
  IsPasswordReset:loginDetail.IsPasswordReset
});

const getTimezone = async (id)=>{ 
  const {data} =await hrlookup.getAllTimezone();
  console.log(data,id)
  return data.filter(x=>x.id === parseInt(id))[0].TimezoneName;
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