/*
This will be the starting file of the project
*/

const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const app = express();
const serverConfig = require("./configs/server.config");
const dbConfig = require("./configs/db.config");
const User = require("./models/user.model");

app.use(express.json());

/**
 * Create an admin user at the start of the application
 * if not already present
 */

// Connection with MongoDB
mongoose.connect(dbConfig.DB_URL);

const db = mongoose.connection;
db.on("error", () => {
  console.log("Error while connecting");
});
db.once("open", () => {
  console.log("Connected to MongoDB");
  init();
});

async function init() {
  const user = await User.findOne({ userId: "admin" });
  if (user) {
    console.log("Admin is already present");
    return;
  }
  try {
    const newUser = await User.create({
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

// Stitch routes to the server
require("./routes/auth.routes")(app);

/**
 * Start the server
 */
app.listen(serverConfig.PORT, () => {
  console.log("Server started on", serverConfig.PORT);
});
