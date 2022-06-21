var express = require('express');
const router = express.Router();
const storageController = require('../Controllers/storage');
const hrController = require('../Controllers/hr/hr.controller'); 
const authorize = require('../helpers/authorize')
const Role = require('../helpers/role');
const userHelper = require('../helpers/userprofilehelper');

router.post("/blobupload", authorize, storageController.blobupload);

router.post("/uploadHrFiles", userHelper.getUserTimezone, storageController.fileupload, hrController.createDocumentUpload);

router.get("/getModules", authorize, storageController.getModules);

router.post("/getFileTypesByModule", authorize, storageController.getFileTypesByModule);

router.post("/getFileTypeDetailByFileTypeId", authorize, storageController.getFileTypeDetailByFileTypeId);

module.exports = router;