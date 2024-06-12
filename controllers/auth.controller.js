const bcrypt = require("bcryptjs");
const User = require("../models/user.model");
const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const secret = require("../configs/auth.config");
exports.signup = async (req, res) => {
  const { name, userId, userType, password, email } = req.body;

  if (!name || !userId || !userType || !password || !email) {
    return res.status(400).send({
      message:
        "Please provide all required fields (name, userId, userType, password, email).",
    });
  }

  const userObj = {
    name,
    userId,
    userType,
    email,
    password: bcrypt.hashSync(password, 8),
  };

  try {
    const userCreated = await User.create(userObj);

    // Removing sensitive information before sending the response
    //    userCreated.password = undefined;

    const res_obj = {
      name: userCreated.name,
      userId: userCreated.userId,
      email: userCreated.email,
      userType: userCreated.userType,
      createdAt: userCreated.createdAt,
      updatedAt: userCreated.updatedAt,
    };
    res.status(201).send(res_obj);
  } catch (err) {
    console.error("Error while registering:", err);
    res.status(500).send({
      message: "Some error happened while registering the user",
    });
  }
};

exports.signin = async (req, res) => {
  //check if user id is present or not
  const user = await userModel.findOne({ userId: req.body.userId });
  if (user == null) {
    res.status(400).send({
      message: "User id passed is not a valid user",
    });
  }
  //if passoword is correct

  const isPasswordvalid = bcrypt.compareSync(req.body.password, user.password);
  if (!isPasswordvalid) {
    res.status(401).send({
      message: "Wrong password entered",
    });
  }
  //using jwt we will create access token with given TTl and return
  const token = jwt.sign({ id: user.userId }, secret.secret, {
    expiresIn: 120,
  });

  res.status(200).send({
    name: user.name,
    userId: user.userId,
    email: user.email,
    userType: user.userType,
    accessToken: token,
  });
};
