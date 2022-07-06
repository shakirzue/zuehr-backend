const db = require("../../models");
const Op = db.Sequelize.Op;

const dateformatehelper = require('../../helpers/datehelper');
const userProfileHelper = require('../../helpers/userprofilehelper');
const mischelper = require('../../helpers/mischelper');

var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
const crypto = require("crypto");

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
   const { employeeNumber, email, password } = req.body;
   if (!(email && password && employeeNumber)) {
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
      if (user && (await bcrypt.compare(process.env.DEFAULTPASSWORD, user.Password)) && user.IsPasswordReset) {
         res.send({status:400, message: "Please change your password", data: user});
      }
      
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

exports.forgotPasswordRequest = async(req, res) =>{
   try{
      if(!req.body.email){
         return res.status(400).send("Please provide email to reset password");
      }
      var oldUser = await getNonCpcgrUserByEmail(req.body.email);
      if (!oldUser) {
         return res.status(409).send("User is not Exist. Please Create User profile first");
      }
      const {Token, Password, IsPasswordReset} = await resetExistingPassword(oldUser);

      let link = "http://" + req.headers.host + "/api/auth/reset/" + Token;
     
      const mailOptions = {
                        to: oldUser.Email,
                        from: process.env.FROM_EMAIL,
                        subject: "Password change request",
                        text: `Hi ${oldUser.email} \n 
                    Please click on the following link ${link} to reset your password. \n\n 
                    If you did not request this, please ignore this email and your password will remain unchanged.\n`,
      };
      console.log(mailOptions)
                  //   sgMail.send(mailOptions, (error, result) => {
                  //       if (error) return res.status(500).json({message: error.message});

                  //       res.status(200).json({message: 'A reset email has been sent to ' + oldUser.email + '.'});
                  //   });
      res.send({status:200, message:'A reset email has been sent to ' + oldUser.email + '.', data:{token: Token}});
   }
   catch(err){
      res.send({status:400, message:'Error while login', data:err});
   }
}

exports.resetPasswordRequest = async(req, res) =>{
   try{
      var oldUser = await getNonCpcgrUserByEmployeeId(req.body.employeeId);
      if (!oldUser) {
         return res.status(409).send("User is not Exist. Please Create User profile first");
      }
      const {Token, Password, IsPasswordReset} = await resetExistingPassword(oldUser);


      res.send({status:200, message:'A password has been reset successfully. Please login to enter new password ', data:{password: process.env.DEFAULTPASSWORD}});
   }
   catch(err){
      res.send({status:400, message:'Error while login', data:err});
   }
}

exports.changePasswordRequest = async(req, res)=>{
   try{   
      const {oldPassword, newPassword, confirmPassword, token, email} = req.body;
      var isUserVarified = false;

      if(!newPassword && !confirmPassword && !token && !email){
         res.send({status:401, message: "please provide required input values to complete reset password process"});
      }

      let filter = { 
         where: {         
            Email: email,
            Token: token         
         }
      };

      let user = await user_Profile.findOne(filter);

      if (user && oldPassword && (await bcrypt.compare(oldPassword, user.Password))) {
         console.log(420)
         if(newPassword === confirmPassword)
            isUserVarified = true;
      }
      else if(user && !oldPassword && newPassword === confirmPassword){
         isUserVarified = true
      }

      if(isUserVarified){
         encryptedPassword = await bcrypt.hash(newPassword, 10);

         const token = jwt.sign(
            { user_id: user.EmployeeNumber, email },
            process.env.TOKEN_KEY,
            {
            expiresIn: "2h",
            }
         );

         const userProfile = {     
            IsPasswordReset: false,
            Password: encryptedPassword,
            Token: token,
            createdAt: dateformatehelper.convertdateobjectformat(new Date())
         };
         const userProfileObj = await user_Profile.update(userProfile, {
            where: {
               id: user.id
            }
		   });
         res.send({status:200, message:'password changed successfully', data:userProfileObj});
      }
      else{
         res.send({status: 400, message: "provided information is not correct"});
      }
   }
   catch(err){
      res.send({status:400, message:'Error while changing password', data:err});
   }
}

exports.passwordResetVerify = async(req, res) =>{
   try{
      const {token, email, employeeId} = req.body;

      if(!token && !email && !employeeId ){
         res.send({status:401, message: "please provide required input values to complete reset password process"});
      }
      var filter = {};
      var requestType = "";

      if(token && email){
         filter = { 
            where: {         
               Email: email,
               Token: token         
            }
         };
         requestType = "forgetpassword";
      }
      else if(employeeId){
         filter = { 
            where: {         
               EmployeeNumber: employeeId
            }
         };
         requestType = "resetpassword";
      }

      let user = await user_Profile.findOne(filter);

      if(user.IsPasswordReset){
         let timezone = await userProfileHelper.getTimezone(user);
         if(dateformatehelper.datesdifference(dateformatehelper.convertdatetoothertimezone(new Date(), timezone), user.updatedAt) < 1)
         {
            res.send({status:200, message:'password reset verified successfully', data:{verified: true, requestType: requestType}});
         }
         else{
            res.send({status:400, message:'password reset verified failed: token has expired', data:{verified: false, requestType: requestType}});
         }
      }
      else{
         res.send({status:400, message:'password reset verified not required', data:{}});
         
      }
   }
   catch(err){
      res.send({status:400, message:'Error while password reset verification', data:err});
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

async function resetExistingPassword(user){
   if(!user){
      return null;
   }
   
   let encryptedPassword = await bcrypt.hash(process.env.DEFAULTPASSWORD, 10);

   let defaultpwd = process.env.DEFAULTPASSWORDSECRET;

   const token = jwt.sign(
      { defaultpwd: defaultpwd },
      process.env.TOKEN_KEY,
      {
        expiresIn: "1h",
      }
    );

   let timezone = await userProfileHelper.getTimezone(user);

   let userProfileData = {
      Token: token,
      Password: encryptedPassword,
      IsPasswordReset: true,
      updatedAt: dateformatehelper.convertdatetoothertimezone(new Date(), timezone)
   }

   let userProfile = await user_Profile.update(userProfileData, {
      where: {
         id: user.id
      }
   });
   return userProfileData;
}
