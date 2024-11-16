const { default: mongoose } = require("mongoose");
require('dotenv').config();

const db = mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("database connected 👍");
  })
  .catch(() => {
    console.log("database not connected");
  });

module.exports = db;