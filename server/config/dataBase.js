const mongoose = require("mongoose");

const URI = process.env.MONGODB_URL;

const connectDB = async () => {
  try {
    mongoose.set("strictQuery", false);
    mongoose.connect(URI,{ useNewUrlParser: true, useUnifiedTopology: true });
    console.log("Mongo connected");
  } catch (error) {
    console.log(error);
    process.exit();
  }
};

module.exports = connectDB;
