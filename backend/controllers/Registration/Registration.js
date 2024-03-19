const User = require("../../models/User");
const { ErrorMessage } = require("../../utils/Error");
const { handleUpload } = require("../../config/cloudinaryConfig");
const twilio = require("twilio");

const client = twilio(process.env.ACCOUNT_SID, process.env.AUTH_TOKEN);
const registerFarmer = async (req, res) => {
  if (!req.body) {
    return res.status(400).json(ErrorMessage("Did'nt Received Data", true));
  }

  try {
    const { name, location, aadharNumber, phone, metamaskWalletAddress } =
      req.body;
    // console.log("REQ",req);
    if (!name || !location || !aadharNumber || !phone || !metamaskWalletAddress)
      return ErrorMessage("Information is Missing", true);

    const existUser = await User.findOne({ aadharNumber }).exec();

    if (existUser) {
      return res.status(200).json({
        message: "Already Registered",
        error: false,
      });
    } else {
      const b64_aadhar = Buffer.from(
        req.files["aadharImage"][0].buffer
      ).toString("base64");
      let aadhar_URI =
        "data:" +
        req.files["aadharImage"][0].mimetype +
        ";base64," +
        b64_aadhar;
      const cldRes_aadhar = await handleUpload(aadhar_URI, "PDS_System");

      const b64_user = Buffer.from(req.files["userImage"][0].buffer).toString(
        "base64"
      );
      let user_URI =
        "data:" + req.files["userImage"][0].mimetype + ";base64," + b64_user;
      const cldRes_user = await handleUpload(user_URI, "PDS_System");

      console.log("Aadhar URL", cldRes_aadhar.secure_url);
      console.log("USER URL", cldRes_user.secure_url);

      console.log(name, location, aadharNumber, phone, metamaskWalletAddress);

      const newUser = {
        name: name,
        phone: phone,
        metamaskWalletAddress: metamaskWalletAddress,
        location: location,
        aadharNumber: aadharNumber,
        aadharImage: cldRes_aadhar.secure_url,
        userImage: cldRes_user.secure_url,
        role: "farmer",
      };

      await User.create(newUser);

      return res.status(200).json({
        message: "Successfully Registered As Farmer",
        error: false,
      });
    }
  } catch (err) {
    return res.status(400).json(ErrorMessage(err, true));
    console.log(err);
  }
};

const registerApmcOfficer = async (req, res) => {
  console.log("OFFICER DATA", req.body);
  if (!req.body) {
    return res.status(400).json(ErrorMessage("Did'nt Received Data", true));
  }

  try {
    const { name, address, aadharNumber, contactNumber, metaMaskAddress } =
      req.body;
    // console.log("REQ",req);
    if (
      !name ||
      !address ||
      !aadharNumber ||
      !contactNumber ||
      !metaMaskAddress
    )
      return ErrorMessage("Information is Missing", true);

    const existUser = await User.findOne({ aadharNumber }).exec();

    if (existUser) {
      return res.status(200).json({
        message: "Already Registered",
        error: false,
      });
    } else {
      const b64_aadhar = Buffer.from(
        req.files["aadharImage"][0].buffer
      ).toString("base64");
      let aadhar_URI =
        "data:" +
        req.files["aadharImage"][0].mimetype +
        ";base64," +
        b64_aadhar;
      const cldRes_aadhar = await handleUpload(aadhar_URI, "PDS_System");

      console.log("Aadhar URL", cldRes_aadhar.secure_url);

      const newUser = {
        name: name,
        phone: contactNumber,
        metamaskWalletAddress: metaMaskAddress,
        location: address,
        aadharNumber: aadharNumber,
        aadharImage: cldRes_aadhar.secure_url,
        role: "officer",
      };

      await User.create(newUser);
      console.log("CREATED USER");
      return res.status(200).json({
        message: "Successfully Registered As Officer",
        error: false,
      });
    }
  } catch (err) {
    return res.status(400).json(ErrorMessage(err, true));
    console.log(err);
  }
};

const getUserDetails = async (req, res) => {
  try {
    const _id = req.id;

    if (!_id) {
      return res.status(400).json({
        message: "Something Went Wrong",
        error: true,
      });
    }

    const details = User.findById(_id);
    console.log(details);

    if (!details) {
      return res.status(400).json({
        message: "User Doesn't Exists",
        error: true,
      });
    }

    res.status(200).json({
      message: "User found",
      error: false,
      details: details,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: "Something Went Wrong",
      error: true,
    });
  }
};

const sendOtp = async (req, res) => {
  const phoneNumber = req.body.phoneNumber;

  client.verify
    .services(VERIFY_SERVICE_SID)
    .verifications.create({ to: phoneNumber, channel: "sms" })
    .then((verification) => {
      console.log(`OTP sent to ${phoneNumber}`);
      return res.status(200).json({
        message: "OTP sentSuccessfully",
        error: false,
      });
    })
    .catch((err) => {
      console.error(`Error sending OTP: ${err}`);
      // res.status(500).send('Error sending OTP');
    });
};

const verifyOtp = async (req, res) => {
  const phoneNumber = req.body.phoneNumber;
  const code = req.body.code;

  client.verify
    .services(VERIFY_SERVICE_SID)
    .verificationChecks.create({ to: phoneNumber, code: code })
    .then((verification_check) => {
      if (verification_check.status === "approved") {
        console.log(`Verification successful for ${phoneNumber}`);
        return res.status(200).json({
          message: "Verification Successfull",
          error: false,
        });
      }
    })
    .catch((err) => {
      console.error(`Error verifying OTP: ${err}`);
      console.log(`Verification failed for ${phoneNumber}`);
      return res.status(400).json({
        message: "Verification Failed. Please try again",
        error: true,
      });
    });
};

module.exports = {
  registerFarmer,
  registerApmcOfficer,
  getUserDetails,
  sendOtp, 
  verifyOtp
};
