const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      maxLength: 30,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      public_id: {
        type: String,
        default: "2048px-OOjs_UI_icon_userAvatar.svg_zdrzhi.png",
      },
      url: {
        type: String,
        default:
          "https://res.cloudinary.com/buidoanquanghuy19112002/image/upload/v1687239045/delishipexpress/2048px-OOjs_UI_icon_userAvatar.svg_zdrzhi.png",
      },
    },
    role: {
      type: String,
      enum: ["sender", "admin", "deliverier"],
      default: "sender",
    },
    verified: {
      type: Boolean,
      default: false,
    },
    fullname: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
    },
    identityCard: {
      type: String,
    },
    address: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("User", userSchema);
