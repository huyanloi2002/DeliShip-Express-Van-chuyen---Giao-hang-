require("dotenv").config();

const nodemailer = require("nodemailer");

const UserOTPVerification = require("../models/userOTPVerificationModel");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.AUTH_EMAIL,
    pass: process.env.AUTH_PASS,
  },
});

const sendMailOTP = async ({ _id, email, username }, res) => {
  try {
    const otp = `${Math.floor(1000 + Math.random() * 9000)}`;

    const mailOptions = {
      from: process.env.AUTH_EMAIL,
      to: email,
      subject: "Verify Your Email",
      html: `
      <h2 class="title_verify-gmail fw-bold mb-4" style="color: #ffbd59">
      Verify your email
    </h2>
    <div style="font-weight: 500; font-size: small">
      <p>Welcome, <b style="color: #ffbd59">${username}</b> !</p>
      <p>Your account has been created on our platform</p>
      <p>
        Please verify the information with the OTP we send to your email
      </p>
      <h5 class="mb-4">
        <b
          >Your email address:
          <span style="color: #ffbd59">${email}</span></b
        >
      </h5>
      <p>
        Enter OTP at the bottom in the app to verify your email address and
        complete:
      </p>
      <div
        style="
          width: 200px;
          height: 50px;
          background-color: #ffbd59;
          text-align: center;
          border-radius:5px
        "
      >
        <span style="letter-spacing: 0.5rem; font-size: xx-large">
          <b>${otp}</b>
        </span>
      </div>
      <p class="mt-2"><b>Note: </b>This code expires in 10 minutes.</p>
      <p style="font-style:italic">
      <b>Bui Doan Quang Huy</b> from DeliShip Express
    </div>`,
    };

    const newOTPVerification = new UserOTPVerification({
      userId: _id,
      otp: otp,
      createdAt: Date.now(),
      expiresAt: Date.now() + 10 * 60 * 1000,
    });

    await newOTPVerification.save();
    transporter.sendMail(mailOptions);
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};
module.exports = sendMailOTP;
