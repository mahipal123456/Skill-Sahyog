require('dotenv').config();

const jwt = require('jsonwebtoken');
function verifytoken(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
   return res.status(401).json({ message: "No token provided" });

  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.Secret);
    req.user = decoded; // attach user data from token
    next();
  } catch (err) {
    return res.status(403).json({ message: "invalid token" });
  }
}
module.exports=verifytoken