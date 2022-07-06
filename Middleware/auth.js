///token verification
///accessing service classes
const jwt = require('jsonwebtoken');
const jwt_decode = require('jwt-decode');
const { secret } = require('../config.json');
//const { verifyToken } = require('./authorizeNonCpcgrUser');
const jwt = require("jsonwebtoken");

const config = process.env;

const authorize = (req, res, next) => {
  
    const authHeader = req.headers.authorization;
    const token = authHeader.split(' ')[1];
    var decodedHeader = jwt_decode(token);
    if (req.headers.oid === decodedHeader.oid) {        
        next();
    }
    // else {
    //     verifyToken(req, res, next);
    // }
};


function verifyToken(req, res, next){
  const authHeader = req.headers.authorization;
  const token = authHeader.split(' ')[1];

  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }
 
  try {
    const decoded = jwt.verify(token, config.TOKEN_KEY);
    req.user = decoded;

  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
  return next();
};
module.exports = {authorize, verifyToken};