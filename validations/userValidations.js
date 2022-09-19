const jwt = require("jsonwebtoken");

const TokenValidation = async (req, res, next) => {
  let tokenBearer = req.headers["authorization"];
  let tokenArr = tokenBearer.split(" ");
  let result = jwt.decode(tokenArr[1]);
  if (result) {
    next();
  }
};

module.exports = { TokenValidation };
