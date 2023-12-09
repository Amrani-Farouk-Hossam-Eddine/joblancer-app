const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const userRoute = require("./routes/user.route");
const authRoute = require("./routes/auth.route");
const gigRoute = require("./routes/gig.route");
const reviewRoute = require("./routes/review.route");
const orderRoute = require("./routes/order.route");
const conversationRoute = require("./routes/conversation.route");
const messageRoute = require("./routes/message.route");
const cors = require("cors");

dotenv.config();

mongoose.set("strictQuery", true);
const connect = async () => {
  try {
    mongoose.connect(process.env.MONGO);
    console.log("Connected to mongodb");
  } catch (err) {
    console.log(err);
  }
};
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/gigs", gigRoute);
app.use("/api/reviews", reviewRoute);
app.use("/api/orders", orderRoute);
app.use("/api/conversations", conversationRoute);
app.use("/api/messages", messageRoute);

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Somthing went wrong";

  return res.status(errorStatus).send(errorMessage);
});

app.listen(8800, () => {
  connect();
  console.log("Backend server running");
});
