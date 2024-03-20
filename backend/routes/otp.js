
const express = require("express")
const router = express.Router()
const Registration = require("../controllers/Registration/Registration")

router.route("/send-otp").post(Registration.sendOtp);
router.route("/verify-otp").post(Registration.verifyOtp);
module.exports = router;