const express = require("express");
const router = express.Router();

const authMiddleware = require("../middlewares/auth");
const paymentController = require("../controllers/paymentController");

router
  .route("/payment/process")
  .post(authMiddleware.isAuthenticatedUser, paymentController.processPayment);

router
  .route("/stripe-api")
  .get(authMiddleware.isAuthenticatedUser, paymentController.sendStripeApi);

module.exports = router;
