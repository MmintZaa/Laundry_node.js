const jwt = require("jsonwebtoken");

const config = process.env;
const verifyToken = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, config.TOKEN_KEY);
    req.user = decoded;
  } catch (err) {
    return res.status(401).json({
      "status": 401,
      "message": "Unauthorized",
    });
  }

  return next();
};


module.exports = {verifyToken};