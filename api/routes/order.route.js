const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/jwt");
const {
  getOrders,
  intent,
  confirm,
} = require("../controller/order.controller");

router.get("/", verifyToken, getOrders);
router.post("/create-payment-intent/:gigId", verifyToken, intent);
router.put("/", verifyToken, confirm);
module.exports = router;
