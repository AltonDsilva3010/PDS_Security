const express = require("express");
const router = express.Router();
const User = require("../models/User");
const dotenv = require("dotenv");

dotenv.config();

// @route    POST api/users
// @desc     Register farmer
// @access   Public

router.post("/", async (req, res) => {
  const { name, contact, publickey, location, aadharHash, role } = req.body;

  try {
    //See if user Exists
    let user = await User.findOne({ publickey });
    if (user) {
      return res.status(400).json({ errors: [{ msg: "User already exists" }] });
    }

    user = new User({
      name,
      contact,
      publickey,
      location,
      aadharHash,
      role,
    });

    await user.save();
    res.json({ user });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
