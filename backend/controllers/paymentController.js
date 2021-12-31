const catchAsync = require("../middlewares/catchAsync");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

//Process stripe payments => /api/v1/payment/process
exports.processPayment = catchAsync(async (req, res, next) => {
  const paymentIntent = await stripe.paymentIntents.create({
    amount: req.body.amount,
    currency: "inr",
    metadata: { integration_check: "accept_a_payment" },
  });

  res.status(200).json({
    success: true,
    client_secret: paymentIntent.client_secret,
  });
});

//send stripe api key => /api/v1/stripe-api
exports.sendStripeApi = catchAsync(async (req, res, next) => {
  res.status(200).json({
    stripeApiKey: process.env.STRIPE_API_KEY,
  });
});
