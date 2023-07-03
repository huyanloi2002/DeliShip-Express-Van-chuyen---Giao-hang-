const router = require("express").Router();
const contactController = require("../controllers/contactController");
const auth = require("../middleware/auth");
const authAdmin = require("../middleware/authAdmin");

router.post("/send_contact", auth, contactController.sendContact);
router.get("/all_contact", contactController.getAllContact);
router.delete("/delete_contact", authAdmin, contactController.deleteContact);

module.exports = router;
