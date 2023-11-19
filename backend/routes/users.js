const express = require("express");
const router = express.Router();
const registerController = require("../controllers/userController");

router.get("/users", registerController.getUsers);
router.post("/update-username", registerController.updateUser);

module.exports = router;
