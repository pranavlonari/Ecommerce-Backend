const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const authConfig = require("../configs/auth.config");

exports.signup = async (req, res) => {
  const { name, userId, userType, password, email } = req.body;

  try {
    const hashedPassword = bcrypt.hashSync(password, 8);
    const user = await User.create({
      name,
      userId,
      userType,
      email,
      password: hashedPassword,
    });

    res.status(201).send({
      name: user.name,
      userId: user.userId,
      email: user.email,
      userType: user.userType,
    });
  } catch (error) {
    res.status(500).send({
      message: "Error while registering user.",
    });
  }
};

exports.signin = async (req, res) => {
  try {
    const user = await User.findOne({ userId: req.body.userId });

    if (!user) {
      return res.status(400).send({
        message: "Invalid userId.",
      });
    }

    const isPasswordValid = bcrypt.compareSync(
      req.body.password,
      user.password
    );

    if (!isPasswordValid) {
      return res.status(401).send({
        message: "Invalid password.",
      });
    }

    const token = jwt.sign({ id: user.userId }, authConfig.secret, {
      expiresIn: 86400, // 24 hours
    });

    res.status(200).send({
      name: user.name,
      userId: user.userId,
      email: user.email,
      userType: user.userType,
      accessToken: token,
    });
  } catch (error) {
    res.status(500).send({
      message: "Error while signing in.",
    });
  }
};
