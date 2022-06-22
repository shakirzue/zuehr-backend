var express = require('express');
const router = express.Router();
const authorize = require('../helpers/authorize');
const authorizeCpcgr = require('../helpers/authorizeNonCpcgrUser');
const userHelper = require('../helpers/userprofilehelper');
const adminsRoute = require("../Controllers/Admin/AdminController");



// ============ Client Profile Routes  ================
router.post("/getUserProfile", adminsRoute.getUserProfile);
router.post("/getSingleUserProfile", adminsRoute.getSingleUserProfile);
router.post("/getUserProfileByObjectId", adminsRoute.getUserProfileByObjectId);
router.post("/createUserProfile", adminsRoute.createUserProfile);
router.post("/updateUserProfile", adminsRoute.updateUserProfile);
router.post("/deleteUserProfile", adminsRoute.deleteUserProfile);
//router.post("/getSingleUserProfileById", adminsRoute.getSingleUserProfileById);

// ============ Client Profile Routes  ================
router.post("/registerNonCpcgrUserProfile",  adminsRoute.registerNonCpcgrUserProfile);
router.post("/loginNonCpcgrUserProfile",  adminsRoute.loginNonCpcgrUserProfile);

module.exports = router;