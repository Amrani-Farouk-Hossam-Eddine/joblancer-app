const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/jwt");
const {
  createMessage,
  getMessages,
} = require("../controller/message.controller");

router.post("/", verifyToken, createMessage);
router.get("/:id", verifyToken, getMessages);

module.exports = router;
