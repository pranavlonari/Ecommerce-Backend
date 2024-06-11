/*
This will be the starting file of the project
*/

const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const app = express();
const server_config = require("./configs/server.config");
const db_config = require("./configs/db.config");
const user_model = require("./models/user.model");

/**
 * Create an admin user at the starting of the application
 * if not already present
 */

// Connection with MongoDB
mongoose.connect(db_config.DB_URL);

const db = mongoose.connection;
db.on("error", () => {
  console.log("Error while connecting");
});
db.on("open", () => {
  console.log("Connected to MongoDB");
  init();
});

async function init() {
  const user = await user_model.findOne({ userId: "admin" });
  if (user) {
    console.log("Admin is already present");
    return;
  }
  try {
    const newUser = await user_model.create({
      name: "Vishwa",
      userId: "admin",
      email: "test12345@gmail.com",
      userType: "ADMIN",
      password: bcrypt.hashSync("welcome1", 8),
    });
    console.log("Admin is created", newUser);
  } catch (err) {
    console.log("Error while creating admin", err);
  }
}

/**
 * Start the server
 */
app.listen(server_config.PORT, () => {
  console.log("Server started on", server_config.PORT);
});
