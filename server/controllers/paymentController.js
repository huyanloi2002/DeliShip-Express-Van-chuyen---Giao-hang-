require("dotenv").config();
const Orders = require("../models/orderModel");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const moment = require("moment");

const paymentController = {
  paymentCreditCard: async (req, res) => {
    const [latitudeSender, longitudeSender] = req.body.senderPosition;
    const [latitudeReceiver, longitudeReceiver] = req.body.receiverPosition;
    const dateExpected = moment(req.body.dateExpected);
    const dateStart = moment(req.body.dateStart);
    const bonusServices = req.body.bonusServices.map((bonus) => ({
      price: bonus.price,
      title: bonus.title,
    }));
    const { token, amountUSD } = req.body;
    try {
      const amountInCents = Math.round(amountUSD * 100);
      const paymentIntent = await stripe.paymentIntents.create({
        amount: amountInCents,
        currency: "usd",
        payment_method_types: ["card"],
        payment_method_data: {
          type: "card",
          card: {
            token: token.id,
          },
        },
        confirm: true,
      });

      if (!dateStart.isValid() || !dateExpected.isValid()) {
        return res.status(400).json({ error: "Invalid date format" });
      }
      const order = new Orders({
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
      return res.status(500).json({ msg: err.message });
    }
  },
};

module.exports = paymentController;
