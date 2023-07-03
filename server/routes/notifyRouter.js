const router = require("express").Router();
const notifyController = require("../controllers/notifyController");
const auth = require("../middleware/auth");
const authAdmin = require("../middleware/authAdmin");

router.post("/create_notify", auth, notifyController.createNotify);
router.get("/get_notifies", auth, notifyController.getNotifies);
router.delete("/delete_notifies/:id", auth, notifyController.removeNotify);

router.patch("/is_read_notify/:id", auth, notifyController.isReadNotify);

// router.delete(
//   "/delete_all_notifies",
//   auth,
//   notifyController.deleteNotifiesById
// );

module.exports = router;
