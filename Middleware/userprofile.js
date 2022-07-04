///accessing service classes
///get particular user profile to create session
//const db = require("../models");
const miscHelper = require("../helpers/mischelper");
const hrhelper = require('../helpers/hrhelper');
const userProfileService = require("../Services/UserProfiling/UserProfilingService");


const getUserTimezone =async (req, res, next) => {    
    if(req.body.userProfileId && req.body.userProfileId != '0'){
        req.body.id = req.body.userProfileId;
        const finddata = await userProfileService.getSingleUserProfile(req, res)
        req.session.userProfile = finddata.data;
    }
    next();
};

const getUserByEmail =async (req, res) => {
    // if(req.body.email && miscHelper.ValidateEmail(req.body.email) && req.body.email != '')
    // return await user_Profile.findOne({
    //     where: {
    //        Email: req.body.email
    //     }
    //  });
    return;
};

const getTimezone =async (data) => {    

      
         let timezone =await hrhelper.getTimezone(data);
         console.log(timezone,840)
         return timezone[0].Description;
        
   
};

module.exports ={ getUserTimezone, getUserByEmail, getTimezone};