const db = require("../models");
const miscHelper = require("./mischelper");
const hrhelper = require('./hrhelper');
const user_Profile = db.userProfile;


const getUserTimezone =async (req, res, next) => {    
    if(req.body.userProfileId && req.body.userProfileId != '0'){
        const finddata = await user_Profile.findOne({
            where: {
               id: req.body.userProfileId
            }
         }); 
      
         //let timezone =await hrhelper.getTimezone(req,res, finddata);
         finddata.Timezone =await getTimezone(finddata);
         req.session.userProfile = finddata;
    }
    next();
};

const getUserByEmail =async (req, res) => {
    if(req.body.email && miscHelper.ValidateEmail(req.body.email) && req.body.email != '')
    return await user_Profile.findOne({
        where: {
           Email: req.body.email
        }
     });
};

const getTimezone =async (data) => {    

      
         let timezone =await hrhelper.getTimezone(data);
         return timezone[0].Description;
        
   
};

module.exports ={ getUserTimezone, getUserByEmail, getTimezone};