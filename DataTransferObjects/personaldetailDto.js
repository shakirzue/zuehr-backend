const { getPaginationInfo } = require('../helpers/paginationhelper');
const hrlookup = require("../Services/EmployeeProfiling/LookupService");
const getPersonalDetailDTO = async (personalDetail) => ({
  id: personalDetail.Personal_Detail_Id,
  EmployeeNumber: personalDetail.EmployeeCode,
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
  Location: await getLocation(personalDetail.Location_Id),
  Company: await getCompany(personalDetail.Company_Id),
  Department: await getDepartment(personalDetail.Department_Id),
  Designation: await getDesignation(personalDetail.Designation_Id)
});

const getGender = async (id)=>{ 
  const {data} =await hrlookup.findAllGender();
  return data.filter(x=>x.Gender_Id ===id)[0].GenderName;
}

const getLocation = async (id)=>{ 
  const {data} =await hrlookup.findAllLocation();
  return data.filter(x=>x.Location_Id ===id)[0].LocationName;
}

const getCompany = async (id)=>{ 
  const {data} =await hrlookup.findAllCompany();
  return data.filter(x=>x.Company_Id ===id)[0].Name;
}

const getDepartment = async (id)=>{ 
  const {data} =await hrlookup.findAllDepartment();
  return data.filter(x=>x.Department_Id ===id)[0].DepartmentName;
}

const getDesignation = async (id)=>{ 
  const {data} =await hrlookup.findAllDesignation();
  return data.filter(x=>x.Designation_Id ===id)[0].DesignationTitle;
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