const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  contact: {
    type: Number,
    required: true,
  },
  publickey: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  aadharHash: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["farmer", "official"],
    default: "farmer",
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = User = mongoose.model("user", UserSchema);
