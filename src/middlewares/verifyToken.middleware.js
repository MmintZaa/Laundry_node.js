const jwt = require("jsonwebtoken");


const verifyToken = (req, res, next) => {
  try {
    const token = req.headers["authorization"] ?? "";
    const regex = /Bearer *.*/g;
    if (token && regex.test(token)) {
      const _token = token.replace("Bearer ", "");
      jwt.verify(_token, process.env.JWT_SECRET, (err, decode) => {
        if (err) {
          throw new Error(err);
        } else {
          req.user = decode;
          next();
        }
      });
    } else {
      throw new Error("Invalid token");
    }
  } catch (error) {
    next(error);
  }
};


module.exports = verifyToken;