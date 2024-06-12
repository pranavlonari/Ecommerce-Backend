/**
 * create a mw will check if the request body is proper and correct
 *
 */

const user_model = require("../models/user.model");

const verifySignUpBody = async (req, res, next) => {
  try {
    // Check name
    if (!req.body.name) {
      return res.status(400).send({
        message: "failed! Name was not provided in request body",
      });
    }

    // Check email
    if (!req.body.email) {
      return res.status(400).send({
        message: "failed! Email was not provided in request body",
      });
    }

    // Check userId
    if (!req.body.userId) {
      return res.status(400).send({
        message: "failed! UserId was not provided in request body",
      });
    }

    // Check if the user with the same userId is already present
    const user = await user_model.findOne({ userId: req.body.userId });

    if (user) {
      return res.status(400).send({
        message: "failed! User with the same userId is already present",
      });
    }
    next();
  } catch (err) {
    console.log("Error while validating");
    res.status(500).send({
      message: "Error while validating",
    });
  }
};

const verifySignInBody = async (req, res, next) => {
  if (!req.body.userId) {
    return res.status(400).send({
      message: "userID is not provided",
    });
  }

  if (!req.body.password) {
    return res.status(400).send({
      message: "password is not provided",
    });
  }
  next();
};

module.exports = {
  verifySignUpBody: verifySignUpBody,
  verifySignInBody: verifySignInBody,
};
