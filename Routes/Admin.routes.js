var express = require('express');
const router = express.Router();
const authorize = require('../helpers/authorize');
const authorizeCpcgr = require('../helpers/authorizeNonCpcgrUser');
const userHelper = require('../helpers/userprofilehelper');
const adminsRoute = require('../Controllers/Admin/userprofile.controller'); //require("../Controllers/Admin/AdminController");



// ============ Client Profile Routes  ================
router.post("/getUserProfile", adminsRoute.getUserProfile);
router.post("/getSingleUserProfile", adminsRoute.getSingleUserProfile);
//router.post("/getUserProfileByObjectId", adminsRoute.getUserProfileByObjectId);
//router.post("/createUserProfile", adminsRoute.createUserProfile);
//router.post("/updateUserProfile", adminsRoute.updateUserProfile);
router.post("/deleteUserProfile", adminsRoute.deleteUserProfile);
//router.post("/getSingleUserProfileById", adminsRoute.getSingleUserProfileById);

// ============ Client Profile Routes  ================
router.post("/registerNonCpcgrUserProfile", adminsRoute.registerNonCpcgrUserProfile);
router.post("/loginNonCpcgrUserProfile", adminsRoute.loginNonCpcgrUserProfile);
router.post("/forgotPasswordRequest", adminsRoute.forgotPasswordRequest);
router.post("/passwordResetVerify", adminsRoute.passwordResetVerify);
router.post("/resetPasswordRequest", adminsRoute.resetPasswordRequest);
router.post("/changePasswordRequest", adminsRoute.changePasswordRequest);
module.exports = router;