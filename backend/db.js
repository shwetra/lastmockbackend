const mongoose = require("mongoose");
mongoose.set("strictQuery", true);
require("dotenv").config();
const url = process.env.URL;
const dbConnect = () => {
  return mongoose.connect(url);
};
module.exports = dbConnect;