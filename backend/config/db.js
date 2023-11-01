const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true });
    console.log("MongoDB Connected...");
  } catch (error) {
    console.log(error.message);
    //Exit process with failure
    process.exit(1);
  }
};

module.exports = connectDB;
