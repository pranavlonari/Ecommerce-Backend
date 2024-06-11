/*
This will be the starting file of the project
*/

const express = require("express");
const mongoose = require("mongoose");

const app = express();
const server_config = require("./configs/server.config");

/**
 * Start the server
 */
app.listen(server_config.PORT, () => {
  console.log("server started on", server_config.PORT);
});
