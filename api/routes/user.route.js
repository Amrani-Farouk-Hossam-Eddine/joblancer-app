const express = require("express");
const router = express.Router();
const { deleteUser, getUser } = require("../controller/user.controller");
const verifyToken = require("../middleware/jwt");

router.get("/:id", verifyToken, getUser);
router.delete("/:id", verifyToken, deleteUser);

module.exports = router;
