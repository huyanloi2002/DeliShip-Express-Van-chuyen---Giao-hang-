require("dotenv").config();
const Users = require("../models/userModel");
const cloudinary = require("cloudinary");

const userController = {
  updateProfile: async (req, res) => {
    try {
      const { id } = req.user;
      const updateUser = {
        phone: req.body.phone,
        address: req.body.address,
        identityCard: req.body.identityCard,
      };

      if (req.body.avatar !== "") {
        const user = await Users.findById(id);

        const image_id = user.avatar.public_id;
        const res = await cloudinary.v2.uploader.destroy(image_id);

        const result = await cloudinary.v2.uploader.upload(req.body.avatar, {
          folder: "delishipexpress",
          width: 150,
          crop: "scale",
        });

        updateUser.avatar = {
          public_id: result.public_id,
          url: result.secure_url,
        };
      }

      const userUpdate = await Users.findByIdAndUpdate(id, updateUser, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
      });

      res.status(200).json({
        success: true,
        userUpdate,
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  getAllUser: async (req, res) => {
    try {
      const users = await Users.find();
      res.status(200).json({
        success: true,
        users,
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  deleteUser: async (req, res) => {
    try {
      const user = await Users.findById(req.params.id);
      if (!user) {
        return res.status(404).json({ message: "Không tìm người dùng." });
      }
      await user.deleteOne();
      res.json({
        message: "Đã xóa người dùng.",
      });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
};

module.exports = userController;
