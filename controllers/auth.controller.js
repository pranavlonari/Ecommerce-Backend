const bcrypt = require("bcryptjs");
const User = require("../models/user.model");

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
