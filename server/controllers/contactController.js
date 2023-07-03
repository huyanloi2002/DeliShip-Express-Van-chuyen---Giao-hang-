require("dotenv").config();
const Contact = require("../models/contactModel");

const contactController = {
  sendContact: async (req, res) => {
    try {
      const { fullname, email, message, phone } = req.body;
      console.log(req.body);

      if (!email) {
        return res.status(400).json({ msg: "Invalid email." });
      }

      if (!message) {
        return res.status(400).json({ msg: "Invalid message." });
      }

      const contact = await Contact({
        fullname,
        email,
        message,
        phone,
      });
      await contact.save();
      return res.json({ contact, msg: "Gửi phản hồi thành công." });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  getAllContact: async (req, res) => {
    try {
      const contact = await Contact.find();

      return res.json({ contact });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  deleteContact: async (req, res) => {
    try {
      const contact = await Contact.findById(req.params.id);
      if (!contact) {
        return res.status(404).json({ message: "Không tìm phản hồi." });
      }
      await contact.deleteOne();
      res.json({
        message: "Đã xóa phản hồi.",
      });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
};

module.exports = contactController;
