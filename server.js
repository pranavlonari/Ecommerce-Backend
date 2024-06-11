/*
This will be the starting file of the project
*/

const express = require("express");
const mongoose = require("mongoose");

const app = express();
const server_config = require("./configs/server.config");
const db_config = require("./configs/db.config");
/**
 * create an admin user at the starting of the application
 * if not already present
 */

//connection with mongodb
mongoose.connect(db_config.DB_URL);

const db = mongoose.connection;
db.on("error", () => {
  console.log("error while connecting");
});
db.on("open", () => {
  console.log("Connected to Mongodb");
});
/**
 * Start the server
 */
app.listen(server_config.PORT, () => {
  console.log("server started on", server_config.PORT);
});
