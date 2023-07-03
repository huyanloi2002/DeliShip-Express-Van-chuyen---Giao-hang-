require("dotenv").config();
const Notifies = require("../models/notifyModel");

const notifyController = {
  createNotify: async (req, res) => {
    try {
      const { id, recipients, url, text, content, image } = req.body;
      const notify = await Notifies({
        id,
        recipients,
        url,
        text,
        content,
        user: req.user._id,
      });
      await notify.save();
      return res.json({ notify });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  getNotifies: async (req, res) => {
    try {
      const notify = await Notifies.find({ recipients: req.user._id })
        .sort({ createdAt: -1 })
        .populate("user", "avatar email");

      return res.json(notify);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  removeNotify: async (req, res) => {
    try {
      const notify = await Notifies.deleteMany({
        id: req.params.id,
        url: req.query.url,
      });
      return res.json(notify);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  isReadNotify: async (req, res) => {
    try {
      const notifies = await Notifies.findOneAndUpdate(
        {
          _id: req.params.id,
        },
        { isRead: true }
      );

      return res.json({ notifies });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  // deleteNotifiesById: async (req, res) => {
  //   try {
  //     const notifies = await Notifies.findOneAndDelete({
  //       id: req.params.id,
  //       url: req.query.url,
  //     });
  //   } catch (err) {
  //     return res.status(500).json({ msg: err.message });
  //   }
  // },
};

module.exports = notifyController;
