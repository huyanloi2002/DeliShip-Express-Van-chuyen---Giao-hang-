const router = require("express").Router();
const paymentController = require("../controllers/paymentController");
const auth = require("../middleware/auth");

router.post("/paymentCreditcard", auth, paymentController.paymentCreditCard);

module.exports = router;
