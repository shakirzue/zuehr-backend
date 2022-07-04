var express = require('express');
const router = express.Router();
const hr = require("../controllers/hr/hr.controller");
const hremp = require("../controllers/hr/hr.employeeprofiling.controller");

//const userHelper = require('../helpers/userprofilehelper');
const userHelper = require('../Middleware/userprofile');

router.post("/createPersonalDetails", userHelper.getUserTimezone, hremp.createPersonalDetails);
router.post("/updatePersonalDetails", userHelper.getUserTimezone, hremp.updatePersonalDetails);
router.post("/findPersonalDetailsByEmployeeId", hremp.findPersonalDetailsByEmployeeId);
router.post("/findAllPersonalDetails", hremp.findAllPersonalDetails);
router.post("/findPersonalDetailsByUserProfileId",  hremp.findPersonalDetailsByUserProfileId);

router.post("/createGender", hremp.createGender);
router.post("/getGendersList", hremp.findAllGender);

router.post("/createCompany", userHelper.getUserTimezone, hremp.createCompany);
router.post("/updateCompany", userHelper.getUserTimezone, hremp.updateCompany);
router.post("/findCompanyByUserProfileId",hremp.findCompanyByUserProfileId);

router.post("/createFamilyInformation", userHelper.getUserTimezone, hremp.createFamilyInformation);
router.post("/updateFamilyInformation", userHelper.getUserTimezone,hremp.updateFamilyInformation);
router.post("/findFamilyInformationByUserProfileId",hremp.findFamilyInformationByUserProfileId);

router.post("/createExperience", userHelper.getUserTimezone, hremp.createExperience);
router.post("/updateExperience", userHelper.getUserTimezone, hremp.updateExperience);
router.post("/findExperienceByUserProfileId",hremp.findExperienceByUserProfileId);

router.post("/createDocumentUpload", userHelper.getUserTimezone, hremp.createDocumentUpload);
router.post("/updateDocumentUpload", userHelper.getUserTimezone, hremp.updateDocumentUpload);
router.post("/findDocumentUploadByUserProfileId",hremp.findDocumentUploadByUserProfileId);

router.post("/createBankDetail", userHelper.getUserTimezone, hremp.createBankDetail);
router.post("/updateBankDetail", userHelper.getUserTimezone, hremp.updateBankDetail);
router.post("/findBankDetailByUserProfileId",hremp.findBankDetailByUserProfileId);

// router.post("/createTimeAdjustmentRequest", userHelper.getUserTimezone, hremp.createTimeAdjustmentRequest);
// router.post("/updateTimeAdjustmentRequest", userHelper.getUserTimezone, hremp.updateTimeAdjustmentRequest);
// router.post("/findTimeAdjustmentByUserProfileId", hremp.findTimeAdjustmentByUserProfileId);
// router.post("/findAllTimeAdjustment", hremp.findAllTimeAdjustment);

// router.post("/createShift", userHelper.getUserTimezone, hremp.createShift);
// router.post("/updateShiftRequest", userHelper.getUserTimezone, hremp.updateShiftRequest);
// router.post("/findAllShift", hremp.findAllShift);
// router.post("/findShiftByShiftId", hremp.findShiftByShiftId);
// router.post("/createUserShift", userHelper.getUserTimezone, hremp.createUserShift);
// router.post("/createShiftWeeks", userHelper.getUserTimezone, hremp.createShiftWeeks);
// router.post("/updateUserShift", userHelper.getUserTimezone, hremp.updateUserShift);

// router.post("/createClockInOut", userHelper.getUserTimezone, hremp.createClockInOut);
// router.post("/updateClockInOut", userHelper.getUserTimezone, hremp.updateClockInOut);
// router.post("/findAllClockInOut", hremp.findAllClockInOut);
// router.post("/findClockInOutByProfileId", userHelper.getUserTimezone,hremp.findClockInOutByProfileId);
// router.post("/findClockInOutRange", hremp.findClockInOutRange);

router.post("/createAcademic", userHelper.getUserTimezone, hremp.createAcademic);
router.post("/updateAcademic", userHelper.getUserTimezone, hremp.updateAcademic);
router.post("/findAcademicByUserProfileId", hremp.findAcademicByUserProfileId);

router.post("/createProfessionalReference", userHelper.getUserTimezone, hremp.createProfessionalReference);
router.post("/updateProfessionalReference", userHelper.getUserTimezone, hremp.updateProfessionalReference);
router.post("/findProfessionalReferenceByUserProfileId", hremp.findProfessionalReferenceByUserProfileId);

router.post("/createContactDetails", userHelper.getUserTimezone, hremp.createContactDetails);
router.post("/updateContactDetails", userHelper.getUserTimezone, hremp.updateContactDetails);
router.post("/findContactDetailsByUserProfileId", hremp.findContactDetailsByUserProfileId);

router.post("/createLifeInsurance", userHelper.getUserTimezone, hremp.createLifeInsurance);
router.post("/updateLifeInsurance", userHelper.getUserTimezone, hremp.updateLifeInsurance);
router.post("/findLifeInsuranceByUserProfileId",hremp.findLifeInsuranceByUserProfileId);

router.post("/createBusinessUnit", hremp.createBusinessUnit);
//router.post("/findAllBusinessUnit", hremp.findAllBusinessUnit);
router.post("/createCampaign", hremp.createCampaign);
//router.post("/findAllCampaign", hremp.findAllCampaign);
router.post("/createCompanyDomain", hremp.createCompanyDomain);
// router.post("/findAllCompanyDomain", hremp.findAllCompanyDomain);
// router.post("/findAllCardIssueStatus", hremp.findAllCardIssueStatus);
router.post("/createCostCenter", hremp.createCostCenter);
//router.post("/findAllCostCenter", hremp.findAllCostCenter);
router.post("/createDepartment", hremp.createDepartment);
//router.post("/findAllDepartment", hremp.findAllDepartment);
router.post("/createDesignation", hremp.createDesignation);
//router.post("/findAllDesignation", hremp.findAllDesignation);
router.post("/createGroup", hremp.createGroup);
//router.post("/findAllGroup", hremp.findAllGroup);
router.post("/createHrModuleType", hremp.createHrModuleType);
//router.post("/findAllHrModuleType", hremp.findAllHrModuleType);

router.post("/createJobCategory", hremp.createJobCategory);
//router.post("/findAllJobCategory", hremp.findAllJobCategory);
router.post("/createLeaveRequestType", hremp.createLeaveRequestType);
//router.post("/findAllLeaveRequestType", hremp.findAllLeaveRequestType);
//router.post("/findAllNoticePeriodType", hremp.findAllNoticePeriodType);
router.post("/createQualification", hremp.createQualification);
//router.post("/findAllQualification", hremp.findAllQualification);
router.post("/createReason", hremp.createReason);
//router.post("/findAllReason", hremp.findAllReason);
router.post("/createRelationship", hremp.createRelationship);
//router.post("/findAllRelationship", hremp.findAllRelationship);
router.post("/createRequestStatus", hremp.createRequestStatus);
//router.post("/findAllRequestStatus", hremp.findAllRequestStatus);
router.post("/createRequisitionNumber", hremp.createRequisitionNumber);
//router.post("/findAllRequisitionNumber", hremp.findAllRequisitionNumber);

router.post("/getAllHrLookUps", hremp.getAllHrLookUps);
router.post("/createLocation", hremp.createLocation);
//router.post("/findAllLocation", hremp.findAllLocation);
router.post("/findAllTimezone", hremp.findAllTimezone);
router.post("/createTimezone", hremp.createTimezone);

module.exports = router;