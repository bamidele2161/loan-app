const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.generateToken = (payload, secret, expired) => {
  return jwt.sign(payload, secret, {
    expiresIn: expired,
  });
};

exports.verifyUserToken = async (token, secret) => {
  try {
    const result = jwt.verify(token, secret);
    return result;
  } catch (err) {
    throw new Unauthorized("Authentification error, please check your token.");
  }
};

exports.matchChecker = (value, dbValue) => {
  let compare = bcrypt.compare(value, dbValue);
  return compare;
};
