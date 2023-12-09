const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/jwt");
const {
  getConversations,
  createConversation,
  getConversation,
  updateConversation,
} = require("../controller/conversation.controller");

router.get("/", verifyToken, getConversations);
router.post("/", verifyToken, createConversation);
router.get("/single/:id", verifyToken, getConversation);
router.put("/:id", verifyToken, updateConversation);
module.exports = router;
