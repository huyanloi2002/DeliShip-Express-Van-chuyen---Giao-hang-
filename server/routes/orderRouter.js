const router = require("express").Router();
const orderController = require("../controllers/orderController");
const auth = require("../middleware/auth");
const authAdmin = require("../middleware/authAdmin");

router.post("/create_order", auth, orderController.createOrder);

router.get("/get_orders", authAdmin, orderController.getOrders);
router.get(
  "/get_orders_unconfirmed",
  authAdmin,
  orderController.getOrdersUnconfirmed
);
router.get(
  "/get_orders_confirmed",
  authAdmin,
  orderController.getOrdersConfirmed
);
router.get(
  "/get_orders_delivering",
  authAdmin,
  orderController.getOrdersDelivering
);
router.get(
  "/get_orders_delivered",
  authAdmin,
  orderController.getOrdersDelivered
);
router.get("/get_orders_unpaid", authAdmin, orderController.getOrdersUnpaid);
router.get("/get_orders_paid", authAdmin, orderController.getOrdersPaid);
router.put("/update_order/:id", authAdmin, orderController.updateOrder);
router.delete("/delete_order/:id", authAdmin, orderController.deleteOrder);

router.get("/get_orders_by_user/:id", auth, orderController.getOrdersByIdUser);
router.get("/get_order/:id", auth, orderController.getOrderById);

router.patch("/update_reviews/:id", auth, orderController.updateReviews);

module.exports = router;
