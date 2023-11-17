const express = require("express");
const router = express.Router();
const User = require("../models/User");
const dotenv = require("dotenv");

dotenv.config();

// @route    POST api/users
// @desc     Register farmer
// @access   Public

router.post("/", async (req, res) => {
  const { name, contact, publickey, location, role } = req.body;

  try {
    //See if user Exists
    let user = await User.findOne({ publickey });
    if (user) {
      return res.status(400).json({ errors: [{ msg: "User already exists" }] });
    }
    console.log(req.body);
    let aadharHash;
    if (req.file) {
      const b64 = Buffer.from(req.file.buffer).toString("base64");
      let dataURI = "data:" + req.file.mimetype + ";base64," + b64;
      const cldRes = await handleUpload(
        dataURI,
        `PDS_System/${req.body.category}`
      );
      aadharHash = cldRes.secure_url;
      console.log(aadharHash);
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

// @route    POST api/official
// @desc     Register official
// @access   Public

router.post("/official", async (req, res) => {
  const { name, contact, publickey, location } = req.body;

  try {
    //See if user Exists
    let user = await User.findOne({ publickey });
    if (user) {
      return res.status(400).json({ errors: [{ msg: "User already exists" }] });
    }
    // console.log(req.body);
    let aadharHash;
    if (req.file) {
      const b64 = Buffer.from(req.file.buffer).toString("base64");
      let dataURI = "data:" + req.file.mimetype + ";base64," + b64;
      const cldRes = await handleUpload(
        dataURI,
        `PDS_System/${req.body.category}`
      );
      aadharHash = cldRes.secure_url;
      console.log(aadharHash);
    }
    let role = "official";
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
