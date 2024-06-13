const jwt = require("jsonwebtoken");
const authConfig = require("../configs/auth.config");
const User = require("../models/user.model");

const verifyToken = (req, res, next) => {
  const token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({
      message: "No token provided. Unauthorized access.",
    });
  }

  jwt.verify(token, authConfig.secret, async (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Unauthorized! Invalid token.",
      });
    }

    const user = await User.findOne({ userId: decoded.id });
    if (!user) {
      return res.status(400).send({
        message: "Unauthorized! User not found.",
      });
    }

    req.userId = decoded.id;
    next();
  });
};

const verifySignUpBody = async (req, res, next) => {
  try {
    if (!req.body.name || !req.body.email || !req.body.userId) {
      return res.status(400).send({
        message: "Name, email, and userId are required.",
      });
    }

    const user = await User.findOne({ userId: req.body.userId });
    if (user) {
      return res.status(400).send({
        message: "User with the same userId already exists.",
      });
    }
    next();
  } catch (err) {
    console.log("Error while validating:", err);
    res.status(500).send({
      message: "Error while validating.",
    });
  }
};

const verifySignInBody = (req, res, next) => {
  if (!req.body.userId || !req.body.password) {
    return res.status(400).send({
      message: "UserId and password are required.",
    });
  }
  next();
};

module.exports = {
  verifyToken,
  verifySignUpBody,
  verifySignInBody,
};
