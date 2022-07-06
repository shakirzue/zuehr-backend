const { getPaginationInfo } = require('../helpers/paginationhelper');
const hrlookup = require("../Services/EmployeeProfiling/LookupService");
const getDepartmentUserDTO = async (personalDetail) => ({
  id: personalDetail.Personal_Detail_Id,
  EmployeeNumber: personalDetail.EmployeeCode,
  FirstName:personalDetail.FirstName,
  MiddleName:personalDetail.MiddleName,
  LastName:personalDetail.LastName, 
  Department: await getDepartment(personalDetail.Department_Id),
  isExecutive: personalDetail.isExecutive
});

const getDepartment = async (id)=>{ 
  const {data} =await hrlookup.findAllDepartment();
  return data.filter(x=>x.Department_Id ===id)[0].DepartmentName;
}

exports.getDepartmentUserByIdResponseDTO = async (personalDetail) => ({
  data: await getDepartmentUserDTO(personalDetail),
});

exports.getDepartmentUserResponseDTO = async (personalDetail, page=0, limit=0, count=0) => ({
  data:await Promise.all(personalDetail.map(getDepartmentUserDTO)).then(function(results) {
    return results;
}),
  pagination: getPaginationInfo(page, limit, count),
});