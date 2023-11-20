const express = require("express");
const router = express.Router();
const User = require("../models/User");
const dotenv = require("dotenv");
const Registration = require("../controllers/Registration/Registration");
const Multer = require("multer");
const storage = Multer.memoryStorage();
const upload = Multer({
  storage,
});

dotenv.config();

// @route    POST api/users
// @desc     Register farmer
// @access   Public

// add isAuth MiddleWare Here
router.route("/register/farmer").post(
  upload.fields([
    { name: "aadharImage", maxCount: 1 },
    { name: "userImage", maxCount: 1 },
  ]),
  Registration.registerFarmer
);
module.exports = router;
