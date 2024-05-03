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

router
  .route("/register/apmc-officer")
  .post(
    upload.fields([{ name: "aadharImage", maxCount: 1 }]),
    Registration.registerApmcOfficer
  );

router.route("/register/buyer").post(
  upload.fields([
    { name: "aadharImage", maxCount: 1 },
    { name: "userImage", maxCount: 1 },
  ]),
  Registration.registerBuyer
);

router.route("/getdetails").post(Registration.getUserDetails);

// @route    PUT api/users
// @desc     Verify farmer
// @access   Public

router.route("/verify/farmer").put(Registration.verifyFarmer);

// @route    POST api/users
// @desc     Register farmer
// @access   Public

router.route("/login/farmer").post(Registration.LoginFarmer);

// @route    POST api/users
// @desc     Register farmer
// @access   Public
router.route("/all/farmer").get(Registration.getAllFarmers);

// @route    POST api/users
// @desc     Register farmer
// @access   Public
router.route("/all/officer").get(Registration.getAllOfficer);

// @route    POST api/users
// @desc     Get Farmer Detail by ID
// @access   Public
router.route("/byid/farmer").post(Registration.getFarmerById);

module.exports = router;
