const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/jwt");
const {
  createReview,
  getReviews,
  deleteReview,
} = require("../controller/review.controller");

router.post("/", verifyToken, createReview);
router.get("/:gigId", getReviews);
router.delete("/:id", deleteReview);

module.exports = router;
