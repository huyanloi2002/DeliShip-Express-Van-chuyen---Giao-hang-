require("dotenv").config();
const Order = require("../models/orderModel");
const moment = require("moment");

const orderController = {
  // Tạo đơn hàng
  createOrder: async (req, res) => {
    const [latitudeSender, longitudeSender] = req.body.senderPosition;
    const [latitudeReceiver, longitudeReceiver] = req.body.receiverPosition;
    const dateExpected = moment(req.body.dateExpected);
    const dateStart = moment(req.body.dateStart);
    const bonusServices = req.body.bonusServices.map((bonus) => ({
      price: bonus.price,
      title: bonus.title,
    }));

    try {
      if (!dateStart.isValid() || !dateExpected.isValid()) {
        return res.status(400).json({ error: "Invalid date format" });
      }
      const order = new Order({
        userId: req.body.userId,
        nameSender: req.body.nameSender,
        nameReceiver: req.body.nameReceiver,
        senderAddress: {
          nameAddressSender: req.body.senderAddress,
          latitudeSender: latitudeSender,
          longitudeSender: longitudeSender,
        },
        receiverAddress: {
          nameAddressReceiver: req.body.receiverAddress,
          latitudeReceiver: latitudeReceiver,
          longitudeReceiver: longitudeReceiver,
        },
        phoneSender: req.body.phoneSender,
        phoneReceiver: req.body.phoneReceiver,
        note: req.body.note,
        nameParcel: req.body.nameParcel,
        weightParcel: req.body.weightParcel,
        bonusServices: bonusServices,
        nameTrans: req.body.nameTrans,
        unitTrans: req.body.unitTrans,
        dateExpected: dateExpected.toDate(),
        dateStart: dateStart.toDate(),
        distance: req.body.distance,
        priceParcel: req.body.priceParcel,
        priceTax: req.body.priceTax,
        priceService: req.body.priceService,
        priceTotal: req.body.priceTotal,
        deliverer: {
          name: req.body.delivererName,
          phone: req.body.delivererPhone,
          desc: req.body.delivererDesc,
        },
        payMethod: req.body.payMethod,
        checkPay: req.body.checkPay,
      });

      const savedOrder = await order.save();
      res.json({
        savedOrder,
        msg: "Created order successfully.",
        success: true,
      });
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },
  //Lấy tất cả thông tin đơn hàng
  getOrders: async (req, res) => {
    try {
      const orders = await Order.find().sort({
        createdAt: -1,
      });
      res.json(orders);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
  //Lấy tất cả thông tin đơn hàng chưa xác nhận
  getOrdersUnconfirmed: async (req, res) => {
    try {
      const orders = await Order.find({ status: "unconfirmed" });
      res.json(orders);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
  //Lấy tất cả thông tin đơn hàng đã xác nhận
  getOrdersConfirmed: async (req, res) => {
    try {
      const orders = await Order.find({ status: "confirmed" });
      res.json(orders);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
  //Lấy tất cả thông tin đơn hàng đang vận chuyển
  getOrdersDelivering: async (req, res) => {
    try {
      const statuses = ["preparing", "pickup complete", "in transit"];
      const orders = await Order.find({ status: { $in: statuses } });
      res.json(orders);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
  //Lấy tất cả thông tin đơn hàng đã vận chuyển
  getOrdersDelivered: async (req, res) => {
    try {
      const orders = await Order.find({ status: "delivered" });
      res.json(orders);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
  //Lấy tất cả thông tin đơn hàng chưa thanh toán
  getOrdersUnpaid: async (req, res) => {
    try {
      const orders = await Order.find({ checkPay: "unpaid" });
      res.json(orders);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
  //Lấy tất cả thông tin đơn hàng đã thanh toán
  getOrdersPaid: async (req, res) => {
    try {
      const orders = await Order.find({ checkPay: "paid" });
      res.json(orders);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
  //Lấy tất cả thông tin đơn hàng
  getOrdersByIdUser: async (req, res) => {
    try {
      const ordersByUser = await Order.find({ userId: req.user.id }).sort({
        createdAt: -1,
      });
      res.json(ordersByUser);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
  //Lấy thông tin đơn hàng bằng Id
  getOrderById: async (req, res) => {
    try {
      const order = await Order.findById(req.params.id);
      if (!order) {
        return res.status(404).json({ message: "Không tìm thấy đơn hàng." });
      }
      res.json(order);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
  //Cập nhật thông tin đơn hàng
  updateOrder: async (req, res) => {
    try {
      const order = await Order.findById(req.params.id);
      if (!order) {
        return res.status(404).json({ message: "Không tìm thấy đơn hàng." });
      }
      order.set(req.body);
      const updatedOrder = await order.save();
      res.json({ updatedOrder, msg: "Update succeed.", success: true });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },
  //Xóa một đơn hàng
  deleteOrder: async (req, res) => {
    try {
      const order = await Order.findById(req.params.id);
      if (!order) {
        return res.status(404).json({ message: "Không tìm thấy đơn hàng." });
      }
      await order.deleteOne();
      res.json({
        message: "Đã xóa đơn hàng.",
        order: { ...order, user: req.user },
      });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  updateReviews: async (req, res) => {
    try {
      const orders = await Order.findOneAndUpdate(
        {
          _id: req.params.id,
        },
        {
          reviews: {
            starReviews: req.body.starReviews,
            statusReviews: req.body.statusReviews,
            commentReviews: req.body.commentReviews,
          },
        }
      );

      return res.json({ orders });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

module.exports = orderController;
