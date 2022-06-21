const jwt = require("jsonwebtoken");

const config = process.env;

async function verifyToken(req, res, next){
  const authHeader = req.headers.authorization;
  const token = authHeader.split(' ')[1];

  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }
 
  try {
    const decoded = await jwt.verify(token, config.TOKEN_KEY);
    req.user = decoded;

  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
  return next();
};

module.exports ={ verifyToken }