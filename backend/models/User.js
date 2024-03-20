const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  dob: {
    type: String,
  },
  email: {
    type: String,
  },
  gender: {
    type: String,
  },
  metamaskWalletAddress: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  aadharNumber: {
    type: Number,
    required: true,
  },
  panCardNumber: {
    type: Number,
  },
  phone: {
    type: Number,
  },
  aadharImage: {
    type: String,
    required: true,
  },
  userImage: {
    type: String,
    required: false,
  },
  role: {
    type: String,
    enum: ["farmer", "officer"],
    required: true,
  },
  verified: {
    type: Boolean,
    default: false,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = User = mongoose.model("user", UserSchema);
