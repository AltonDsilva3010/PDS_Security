const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  metamaskWalletAddress: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  aadharNumber : {
    type : Number,
    required : true
  },
  aadharImage: {
    type: String,
    required: true,
  },
  userImage : {
    type : String,
    required : true,
  },
  role: {
    type: String,
    enum: ["farmer", "official"],
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = User = mongoose.model("user", UserSchema);
