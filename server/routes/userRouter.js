const router = require("express").Router();
const userController = require("../controllers/userController");
const auth = require("../middleware/auth");
const authAdmin = require("../middleware/authAdmin");

router.put("/edit_profile/:id", auth, userController.updateProfile);
router.get("/all_user", authAdmin, userController.getAllUser);
router.delete("/delete_user", authAdmin, userController.deleteUser);

module.exports = router;
