const { getPaginationInfo } = require('../helpers/paginationhelper');
const hrlookup = require("../Services/EmployeeProfiling/LookupService");
const getPersonalDetailDTO = async (personalDetail) => ({
  id: personalDetail.id,
  EmployeeNumber: personalDetail.EmployeeId,
  FirstName:personalDetail.FirstName,
  MiddleName:personalDetail.MiddleName,
  LastName:personalDetail.LastName,
  Phone:personalDetail.Phone,
  DateOfBirth:personalDetail.DateOfBirth,
  GuardianName:personalDetail.Guardian_Name,
  DateOfJoining:personalDetail.DateOfJoining,
  Gender: await getGender(personalDetail.Gender_Id),
  Email:personalDetail.Email,
  IdentityNumber:personalDetail.IdentityNumber,

});

const getGender = async (id)=>{ 
  const {data} =await hrlookup.findAllGender();
  return data.filter(x=>x.id ===id)[0].Description;
}

exports.getPersonalDetailByIdResponseDTO = async (personalDetail) => ({
  data: await getPersonalDetailDTO(personalDetail),
});

exports.getPersonalDetailResponseDTO = async (personalDetail, page=0, limit=0, count=0) => ({
  data:await Promise.all(personalDetail.map(getPersonalDetailDTO)).then(function(results) {
    return results;
}),
  pagination: getPaginationInfo(page, limit, count),
});