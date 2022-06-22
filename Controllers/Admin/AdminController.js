const db = require("../../models");
const dateformatehelper = require('../../helpers/datehelper');
const hrhelper = require('../../helpers/hrhelper');
const mischelper = require('../../helpers/mischelper');

var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');

const user_Profile = db.userProfile;
const NonCpcgrUserProfile = db.nonCpcgrUserProfile;
//const Timezone = db.timezone;

exports.getUploadImage = async (req, res) => {
     return;
   const finddata = await Client_Detail.findAll({
     //include:Clinet_User_Link
   });
    if(finddata){
       res.send({status:1, message:'Success', data:finddata});
    }
    else{
     res.send({status:0, message:'No Record Found.'});
    }
};

exports.getUserProfile = async (req, res) => {
   const finddata = await user_Profile.findAll({
   });
    if(finddata){
       res.send({status:1, message:'Success', data:finddata});
    }
    else{
     res.send({status:0, message:'No Record Found.'});
    }
};

exports.getSingleUserProfile = async (req, res) => {
  try{
  const finddata = await user_Profile.findOne({
     where: {
        id: req.body.id
     },
  }); 
   if(finddata){
      res.send({status:1, message:'Success', data:finddata});
   }
   else{
     res.send({status:0, message:'No Record Found.'});
    }
  }
  catch(err){
     res.status(400).send(err);
  }
};

// exports.getSingleUserProfileById = async (req, res) => {
//    try{      
//    const finddata = await user_Profile.findOne({
//       where: {
//          id: req.body.userProfileId
//       }
//    }); 

//    let timezone =await hrhelper.getTimezone(req,res, finddata);
//    finddata.Timezone = timezone[0].Description;

//     if(finddata){
//        return ({status:1, message:'Success', data:finddata});
//     }
//     else{
//       return ({status:0, message:'No Record Found.'});
//      }
//    }
//    catch(err){
//       console.log(err)
//       res.status(400).send(err);
//    }
// };

// exports.getUserProfileByEmail = async (req, res) => {
//    try{      
//    const finddata = await getNonCpcgrUserByEmail(req.body.email);
//     if(finddata){
//        return ({status:1, message:'Success', data:finddata});
//     }
//     else{
//       return ({status:0, message:'No Record Found.'});
//      }
//    }
//    catch(err){
//       console.log(err)
//       res.status(400).send(err);
//    }
// };

exports.getUserProfileByObjectId = async (req, res) => {
   try{
      const finddata = await user_Profile.findOne({
         where: {
            ObjectId: req.body.objectId
         }
      });
      
   if(finddata){
       res.send({status:1, message:'Success', data:finddata});
   }
   else{
      res.send({status:0, message:'No Record Found.'});
     }
   }
   catch(err){
      res.status(400).send(err);
   }
};

exports.createUserProfile = async (req, res) => {
  try{
   const postData = req.body;
     const postObj = {
      ObjectId: postData.ObjectId,
      Name: postData.FirstName,
      Phone: postData.Phone,
      ParentCompany: postData.ParentCompany,
      TenantId: postData.TenantId,     
      Timezone: postData.timezone,
      EmployeeNumber: postData.employeeNumber,
      Email: postData.email,

      createdAt:  dateformatehelper.convertdateobjectformat(new Date())
     }        
        const saveData = await user_Profile.create(postObj);
        if(saveData){
           res.status(200).send({status:1, message:'Successfully Data Saved.', data:saveData});
        } 
        else{
           res.send({status:0, message:'No Record Found.'});
          }           
  }
  catch(err){
     res.status(400).send(err);
  }
};

exports.updateUserProfile = async (req, res) => {
   try{
    const postData = req.body;
    const postObj = {
      ObjectId: postData.ObjectId,
      FirstName: postData.FirstName,
      Phone: postData.Phone,
      ParentCompany: postData.ParentCompany,
      TenantId: postData.TenantId,
      DateOfBirth: postData.DateOfBirth,      
      Gender_Id: postData.Gender_Id,      
      Email: postData.Email,      
      IdentityNumber: postData.IdentityNumber
     }        
         const updateData = await user_Profile.update( postObj , {
            where: {
               id: postData.id
            },
            returning: true,
            plain: true
         });
         res.status(200).send({status:1, message:'Update Successfully.', data:updateData});
      
   }
   catch(err){
      res.status(400).send(err);
   }
};

exports.deleteUserProfile = async (req, res) => {
   try{
    const postData = req.body;
      
      await user_Profile.update({isActive:0},{
         where: {
            id: postData.id
         }
      });
      res.status(200).send({status:1, message:'Delete Successfully.'});
      
   }
   catch(err){
      res.status(400).send(err);
   }
};

exports.registerNonCpcgrUserProfile = async (req, res) =>{
  try {
   const { firstName, surName, employeeNumber, email, password } = req.body;
   if (!(email && password && firstName && surName)) {
     res.status(400).send("All input is required");
   }

   var oldUser = await getNonCpcgrUserByEmail(req.body.email);

   if (oldUser) {
     return res.status(409).send("User Already Exist. Please Login");
   }

   encryptedPassword = await bcrypt.hash(password, 10);

   const token = jwt.sign(
      { user_id: employeeNumber, email },
      process.env.TOKEN_KEY,
      {
        expiresIn: "2h",
      }
    );

   const userProfile = {     
      // Name: req.body.firstName + ' '+ req.body.surName,
      // Phone: req.body.phone,
      // ParentCompany: req.body.ParentCompany,
      Timezone: req.body.timezone,
      EmployeeNumber: employeeNumber,
      Email: email,
      Password: encryptedPassword,
      Token: token,
      createdAt: dateformatehelper.convertdateobjectformat(new Date())
   };
   const userProfileObj = await user_Profile.create(userProfile);

   res.send({status:201, message:'Success', data:userProfileObj});
 } catch (err) {
   console.log(err);
   res.send({status:400, message:'Unsuccess', data:err});
 }

}

exports.loginNonCpcgrUserProfile = async(req, res) =>{
   try {
      const { email, password } = req.body;
  
      if (!(email && password)) {
        res.status(400).send("All input is required");
      }

      let isEmail = mischelper.ValidateEmail(req.body.email);
      var user = isEmail == true ? await getNonCpcgrUserByEmail(email) : await getNonCpcgrUserByEmployeeId(req.body.email);
      if (user && (await bcrypt.compare(password, user.Password))) {
         let email = user.Email;
         let employeeId = user.EmployeeNumber
        const token = jwt.sign(
          { user_id: employeeId, email },
          process.env.TOKEN_KEY,
          {
            expiresIn: "2h",
          }
        );
        
        await user_Profile.update({Token: token}, {
            where: {
               id: user.id
            }
		   });
        res.send({status:201, message:'Success', data:user});
      }
      else{         
         res.send({status:400, message:'Invalid Credentials', data:null});
      }
    } catch (err) {
      res.send({status:400, message:'Error while login', data:err});
    }
}

async function getNonCpcgrUserByEmail(email){
  return await user_Profile.findOne({
      where: {
         Email: email
      }
   });
}

async function getNonCpcgrUserByEmployeeId(employeeId){
   return await user_Profile.findOne({
       where: {
         EmployeeNumber: employeeId
       }
    });
 }