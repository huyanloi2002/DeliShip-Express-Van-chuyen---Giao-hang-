require("dotenv").config();
const Users = require("../models/userModel");
const UserOTPVerification = require("../models/userOTPVerificationModel");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const sendMailOTP = require("../services/sendMail");

const authController = {
  //Đăng ký tài khoản
  register: async (req, res) => {
    try {
      const { username, email, password, fullname } = req.body;

      //loại bỏ chữ in hoa của username
      let newUserName = username.toLowerCase().replace(/ /g, "");

      const user_name = await Users.findOne({ username: newUserName });

      // kiểm username có tồn tại không
      if (user_name) {
        return res.status(400).json({
          msg: "This username is already exists",
          success: false,
          type: "usernameRegister",
        });
      }

      //kiểm tra email có tồn tại không
      const user_email = await Users.findOne({ email: email });
      if (user_email) {
        return res.status(400).json({
          msg: "This email is already exists",
          success: false,
          type: "emailRegister",
        });
      }

      //kiểm tra mật khẩu ít hơn 6 kí tự
      if (password.length < 6) {
        return res.status(400).json({
          msg: "Password must be at least 6 characters",
          success: false,
          type: "passwordRegister",
        });
      }

      //mã hóa mật khẩu
      const passwordHash = await bcrypt.hash(password, 12);

      const newUser = new Users({
        username: newUserName,
        fullname: fullname,
        email: email,
        password: passwordHash,
      });

      //khi đăng ký thành công tự dộng tạo access token và refresh token ngẫu nhiên
      const access_token = createAccessToken({ id: newUser.id });
      const refresh_token = createRefreshToken({ id: newUser.id });

      //lưu refresh token vào cookie với thời hạn là 30 ngày
      res.cookie("refreshtoken", refresh_token, {
        httpOnly: true,
        path: "/api/deliship-express/v1/refresh_token",
        maxAge: 30 * 24 * 60 * 60 * 1000,
      });

      //Lưu user vào cơ sở dữ liệu
      await newUser.save();

      sendMailOTP({ _id: newUser.id, email, username }, res);
      res.json({
        msg: "Verification otp email sent",
        user: {
          userId: newUser.id,
          email: newUser.email,
          username: newUser.username,
          token: access_token,
          fullname: newUser.fullname,
        },
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  verifyOTPRegister: async (req, res) => {
    try {
      const { userId, otp, token } = req.body;
      if (!userId || !otp || !token) {
        return res.status(400).json({
          msg: "Empty otp details are not allowed.",
          type: "VERIFIED",
        });
      } else {
        const UserOTPVerificationRecords = await UserOTPVerification.find({
          userId,
        });
        if (UserOTPVerificationRecords.length <= 0) {
          return res.status(400).json({
            msg: "Account record doesn't or has been verified already. Please sign up.",
            type: "VERIFIED",
          });
        } else {
          const { expiresAt } = UserOTPVerificationRecords[0];
          const oldOTP = UserOTPVerificationRecords[0].otp;

          if (expiresAt < Date.now()) {
            UserOTPVerification.deleteMany({ userId });
            return res.status(400).json({
              msg: "Code has expired. Please resend code again.",
              type: "VERIFIED",
            });
          } else {
            if (otp !== oldOTP) {
              return res.status(400).json({
                msg: "Invalid code passed. Check your inbox.",
                type: "VERIFIED",
              });
            } else {
              await Users.updateOne({ _id: userId }, { verified: true });
              await UserOTPVerification.deleteMany({ userId });
              const userById = await Users.findById({ _id: userId });
              res.json({
                msg: "User email verified successfully.",
                user: userById,
                token,
              });
            }
          }
        }
      }
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  resendOTPRgister: async (req, res) => {
    try {
      const { userId, email, username } = req.body;
      if (!userId || !email || !username) {
        return res
          .status(400)
          .json({ msg: "Empty user details are not allowed." });
      } else {
        await UserOTPVerification.deleteMany({ userId });
        sendMailOTP({ _id: userId, email, username }, res);
        res.json({
          msg: "Email has been resend successfully, please check mail.",
        });
      }
    } catch (err) {
      console.log(err);
      return res.status(500).json({ msg: err.message });
    }
  },

  //Đăng nhập tài khoản
  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      //tìm email trừ password
      const user = await Users.findOne({ email: email });

      //kiểm tra email có tồn tại không ? nếu có thì báo lỗi
      if (!user) {
        return res.status(400).json({
          msg: "This email does not exists",
          success: false,
          type: "emailLogin",
        });
      }

      //Kiểm tra mật khẩu mã hóa với mật khẩu nhập từ query
      const isMatch = await bcrypt.compare(password, user.password);

      //Nếu không trùng khớp thì báo lỗi
      if (!isMatch) {
        return res.status(400).json({
          msg: "Password is incorrect",
          success: false,
          type: "passwordLogin",
        });
      }

      //khi đăng nhập thành công tự dộng tạo access token và refresh token ngẫu nhiên
      const access_token = createAccessToken({ id: user.id });
      const refresh_token = createRefreshToken({ id: user.id });

      //khi đăng nhập thành công , refresh token lưu vào cookie trong 30 ngày
      res.cookie("refreshtoken", refresh_token, {
        httpOnly: true,
        path: "/api/deliship-express/v1/refresh_token",
        maxAge: 30 * 24 * 60 * 60 * 1000,
      });

      res.json({
        msg: "Login success!",
        access_token,
        user: {
          ...user._doc,
          password: "",
        },
        success: true,
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  //Đăng xuất tài khoản
  logout: async (req, res) => {
    try {
      //xóa hết token ở cookie để tài khoản không còn được lưu khi refresh
      res.clearCookie("refreshtoken", {
        path: "/api/deliship-express/v1/refresh_token",
      });
      return res.json({ msg: "Logged out!", success: true });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  //Kiểm tra token
  generateAccessToken: async (req, res) => {
    try {
      //Lấy token từ cookie và kiểm tra nó tồn tại hay không nếu không thì báo lỗi
      const rf_token = req.cookies.refreshtoken;
      if (!rf_token) {
        return res.status(400).json({ msg: "Please login now." });
      }

      //Ngược lại nếu có thì tiếp tục thực hiện kiểm tra token
      jwt.verify(
        rf_token,
        process.env.REFRESH_TOKEN_SECRET,
        async (err, result) => {
          //nếu trường hợp lỗi thì báo lỗi
          if (err) {
            return res.status(400).json({ msg: "Please login now." });
          }

          //nếu không có lỗi thì tiếp tục lấy thông tin của user trừ password
          const user = await Users.findById(result.id);

          //nếu lấy không cố user nào thì báo lỗi tài khoản không tồn tại
          if (!user) {
            return res.status(400).json({ msg: "This does not exist" });
          }

          //lẫy ra access token lưu giũ thông tin user
          const access_token = createAccessToken({ id: result.id });

          //trả ra thông tin user
          res.json({
            access_token,
            user,
          });
        }
      );
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

//hàm tạo access token
const createAccessToken = (payload) => {
  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "1d",
  });
};

//hàm tạo refresh token
const createRefreshToken = (payload) => {
  return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "30d",
  });
};

module.exports = authController;
