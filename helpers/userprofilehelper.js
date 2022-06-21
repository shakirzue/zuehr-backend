const admin = require("../controllers/Admin/Admincontroller");

const getUserTimezone =async (req, res, next) => {    
    if(req.body.userProfileId && req.body.userProfileId != '0')
        req.session.userProfile = await admin.getSingleUserProfileById(req,res);
   next();
};
module.exports ={ getUserTimezone};