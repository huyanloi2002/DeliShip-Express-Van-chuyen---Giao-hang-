const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    nameSender: {
      type: String,
      required: true,
    },
    nameReceiver: {
      type: String,
      required: true,
    },
    senderAddress: {
      nameAddressSender: { type: String, required: true },
      latitudeSender: { type: Number },
      longitudeSender: { type: Number },
    },
    receiverAddress: {
      nameAddressReceiver: { type: String, required: true },
      latitudeReceiver: { type: Number },
      longitudeReceiver: { type: Number },
    },
    phoneSender: {
      type: String,
      required: true,
    },
    phoneReceiver: {
      type: String,
      required: true,
    },
    note: {
      type: String,
    },
    nameParcel: {
      type: String,
      required: true,
    },
    weightParcel: {
      type: Number,
      required: true,
    },
    dateStart: {
      type: Date,
      required: true,
    },
    bonusServices: [
      {
        price: { type: Number },
        title: { type: String },
      },
    ],
    nameTrans: {
      type: String,
      required: true,
    },
    unitTrans: {
      type: String,
      required: true,
    },
    dateExpected: {
      type: Date,
      required: true,
    },
    distance: {
      type: Number,
      required: true,
    },
    priceParcel: {
      type: Number,
      required: true,
    },
    priceTax: {
      type: Number,
      required: true,
    },
    priceService: {
      type: Number,
    },
    priceTotal: {
      type: Number,
      required: true,
    },
    deliverer: {
      name: {
        type: String,
      },
      phone: {
        type: String,
      },
      desc: {
        type: String,
      },
    },
    payMethod: {
      type: String,
      required: true,
    },
    checkPay: {
      type: String,
      enum: ["unpaid", "paid"],
      default: "unpaid",
    },
    status: {
      type: String,
      enum: [
        "unconfirmed",
        "confirmed",
        "preparing",
        "pickup complete",
        "in transit",
        "delivered",
      ],
      default: "unconfirmed",
    },
    reviews: {
      starReviews: { type: Number, default: 0 },
      statusReviews: [String],
      commentReviews: { type: String, default: "Chưa đánh giá" },
    },
    createdDate: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Order", orderSchema);
