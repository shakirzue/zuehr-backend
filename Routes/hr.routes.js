var express = require('express');
const router = express.Router();
const hr = require("../controllers/hr/hr.controller");
const userHelper = require('../helpers/userprofilehelper');

router.post("/createPersonalDetails", userHelper.getUserTimezone, hr.createPersonalDetails);
router.post("/updatePersonalDetails", userHelper.getUserTimezone, hr.updatePersonalDetails);
router.post("/findPersonalDetailsByEmployeeId", hr.findPersonalDetailsByEmployeeId);
router.post("/findAllPersonalDetails", hr.findAllPersonalDetails);
router.post("/findPersonalDetailsByUserProfileId",  hr.findPersonalDetailsByUserProfileId);

router.post("/createGender", hr.createGender);
router.post("/getGendersList", hr.findAllGender);

router.post("/createCompany", userHelper.getUserTimezone, hr.createCompany);
router.post("/updateCompany", userHelper.getUserTimezone, hr.updateCompany);
router.post("/findCompanyByUserProfileId",hr.findCompanyByUserProfileId);

router.post("/createFamilyInformation", userHelper.getUserTimezone, hr.createFamilyInformation);
router.post("/updateFamilyInformation", userHelper.getUserTimezone,hr.updateFamilyInformation);
router.post("/findFamilyInformationByUserProfileId",hr.findFamilyInformationByUserProfileId);

router.post("/createExperience", userHelper.getUserTimezone, hr.createExperience);
router.post("/updateExperience", userHelper.getUserTimezone, hr.updateExperience);
router.post("/findExperienceByUserProfileId",hr.findExperienceByUserProfileId);

router.post("/createDocumentUpload", userHelper.getUserTimezone, hr.createDocumentUpload);
router.post("/updateDocumentUpload", userHelper.getUserTimezone, hr.updateDocumentUpload);
router.post("/findDocumentUploadByUserProfileId",hr.findDocumentUploadByUserProfileId);

router.post("/createBankDetail", userHelper.getUserTimezone, hr.createBankDetail);
router.post("/updateBankDetail", userHelper.getUserTimezone, hr.updateBankDetail);
router.post("/findBankDetailByUserProfileId",hr.findBankDetailByUserProfileId);

router.post("/createTimeAdjustmentRequest", userHelper.getUserTimezone, hr.createTimeAdjustmentRequest);
router.post("/updateTimeAdjustmentRequest", userHelper.getUserTimezone, hr.updateTimeAdjustmentRequest);
router.post("/findTimeAdjustmentByUserProfileId", hr.findTimeAdjustmentByUserProfileId);
router.post("/findAllTimeAdjustment", hr.findAllTimeAdjustment);

router.post("/createShift", userHelper.getUserTimezone, hr.createShift);
router.post("/updateShiftRequest", userHelper.getUserTimezone, hr.updateShiftRequest);
router.post("/findAllShift", hr.findAllShift);
router.post("/findShiftByShiftId", hr.findShiftByShiftId);
router.post("/createUserShift", userHelper.getUserTimezone, hr.createUserShift);
router.post("/createShiftWeeks", userHelper.getUserTimezone, hr.createShiftWeeks);
router.post("/updateUserShift", userHelper.getUserTimezone, hr.updateUserShift);

router.post("/createClockInOut", userHelper.getUserTimezone, hr.createClockInOut);
router.post("/updateClockInOut", userHelper.getUserTimezone, hr.updateClockInOut);
router.post("/findAllClockInOut", hr.findAllClockInOut);
router.post("/findClockInOutByProfileId", userHelper.getUserTimezone,hr.findClockInOutByProfileId);
router.post("/findClockInOutRange", hr.findClockInOutRange);

router.post("/createAcademic", userHelper.getUserTimezone, hr.createAcademic);
router.post("/updateAcademic", userHelper.getUserTimezone, hr.updateAcademic);
router.post("/findAcademicByUserProfileId", hr.findAcademicByUserProfileId);

router.post("/createProfessionalReference", userHelper.getUserTimezone, hr.createProfessionalReference);
router.post("/updateProfessionalReference", userHelper.getUserTimezone, hr.updateProfessionalReference);
router.post("/findProfessionalReferenceByUserProfileId", hr.findProfessionalReferenceByUserProfileId);

router.post("/createContactDetails", userHelper.getUserTimezone, hr.createContactDetails);
router.post("/updateContactDetails", userHelper.getUserTimezone, hr.updateContactDetails);
router.post("/findContactDetailsByUserProfileId", hr.findContactDetailsByUserProfileId);

router.post("/createLifeInsurance", userHelper.getUserTimezone, hr.createLifeInsurance);
router.post("/updateLifeInsurance", userHelper.getUserTimezone, hr.updateLifeInsurance);
router.post("/findLifeInsuranceByUserProfileId",hr.findLifeInsuranceByUserProfileId);

router.post("/createBusinessUnit", hr.createBusinessUnit);
router.post("/findAllBusinessUnit", hr.findAllBusinessUnit);
router.post("/createCampaign", hr.createCampaign);
router.post("/findAllCampaign", hr.findAllCampaign);
router.post("/createCompanyDomain", hr.createCompanyDomain);
router.post("/findAllCompanyDomain", hr.findAllCompanyDomain);
router.post("/findAllCardIssueStatus", hr.findAllCardIssueStatus);
router.post("/createCostCenter", hr.createCostCenter);
router.post("/findAllCostCenter", hr.findAllCostCenter);
router.post("/createDepartment", hr.createDepartment);
router.post("/findAllDepartment", hr.findAllDepartment);
router.post("/createDesignation", hr.createDesignation);
router.post("/findAllDesignation", hr.findAllDesignation);
router.post("/createGroup", hr.createGroup);
router.post("/findAllGroup", hr.findAllGroup);
router.post("/createHrModuleType", hr.createHrModuleType);
router.post("/findAllHrModuleType", hr.findAllHrModuleType);

router.post("/createJobCategory", hr.createJobCategory);
router.post("/findAllJobCategory", hr.findAllJobCategory);
router.post("/createLeaveRequestType", hr.createLeaveRequestType);
router.post("/findAllLeaveRequestType", hr.findAllLeaveRequestType);
router.post("/findAllNoticePeriodType", hr.findAllNoticePeriodType);
router.post("/createQualification", hr.createQualification);
router.post("/findAllQualification", hr.findAllQualification);
router.post("/createReason", hr.createReason);
router.post("/findAllReason", hr.findAllReason);
router.post("/createRelationship", hr.createRelationship);
router.post("/findAllRelationship", hr.findAllRelationship);
router.post("/createRequestStatus", hr.createRequestStatus);
router.post("/findAllRequestStatus", hr.findAllRequestStatus);
router.post("/createRequisitionNumber", hr.createRequisitionNumber);
router.post("/findAllRequisitionNumber", hr.findAllRequisitionNumber);

router.post("/getAllHrLookUps", hr.getAllHrLookUps);
router.post("/createLocation", hr.createLocation);
router.post("/findAllLocation", hr.findAllLocation);
router.post("/findAllTimezone", hr.findAllTimezone);
router.post("/createTimezone", hr.createTimezone);

module.exports = router;