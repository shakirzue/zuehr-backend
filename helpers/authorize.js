const jwt = require('jsonwebtoken');
//const expressJwt = require('express-jwt');
const jwt_decode = require('jwt-decode');
const { secret } = require('../config.json');
const { verifyToken } = require('./authorizeNonCpcgrUser');


const authorize = (req, res, next) => {
  
    const authHeader = req.headers.authorization;
    const token = authHeader.split(' ')[1];
    var decodedHeader = jwt_decode(token);
    if (req.headers.oid === decodedHeader.oid) {        
        next();
    }
    else {
        verifyToken(req, res, next);
    }
};
module.exports = authorize;