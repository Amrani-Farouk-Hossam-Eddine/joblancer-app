const Order = require("../models/order.model");
const Gig = require("../models/gig.model");
const Stripe = require("stripe");

const intent = async (req, res, next) => {
  const stripe = new Stripe(process.env.STRIPE);

  const gig = await Gig.findById(req.params.gigId);

  const paymentIntent = await stripe.paymentIntents.create({
    amount: gig.price * 100,
    currency: "usd",
    automatic_payment_methods: {
      enabled: true,
    },
  });

  const newOrder = new Order({
    gigId: gig._id,
    img: gig.cover,
    title: gig.title,
    buyerId: req.userId,
    sellerId: gig.userId,
    price: gig.price,
    payment_intent: paymentIntent.id,
  });
  await newOrder.save();

  res.status(201).send({
    clientSecret: paymentIntent.client_secret,
  });
};

const getOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({
      ...(req.isSeller ? { sellerId: req.userId } : { buyerId: req.userId }),
      isCompleted: true,
    });
    res.status(200).send(orders);
  } catch (err) {
    next(err);
  }
};

const confirm = async (req, res, next) => {
  const orders = await Order.findOneAndUpdate(
    { payment_intent: req.body.payment_intent },
    {
      $set: {
        isCompleted: true,
      },
    },
    {
      new: true,
    }
  );
  res.status(200).send("order has been confirmed");
};

module.exports = { getOrders, intent, confirm };
