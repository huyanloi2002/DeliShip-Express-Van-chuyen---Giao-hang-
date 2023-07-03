const router = require("express").Router();
const authController = require("../controllers/authController");

router.post("/register", authController.register);
router.post("/verify_otp_register", authController.verifyOTPRegister);
router.post("/resend_otp_register", authController.resendOTPRgister);

router.post("/login", authController.login);
router.post("/logout", authController.logout);
router.post("/refresh_token", authController.generateAccessToken);

module.exports = router;
