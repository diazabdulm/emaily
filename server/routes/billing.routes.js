const billingRouter = require("express").Router();
const keys = require("../config/keys");
const stripe = require("stripe")(keys.stripeSecretKey);

const requireLogin = require("../middlewares/requireLogin");

billingRouter.post("/api/stripe", requireLogin, async (req, res) => {
  try {
    const { id: token } = req.body;
    const charge = await stripe.charges.create({
      amount: 500,
      currency: "usd",
      description: "$5 for 5 credits",
      source: token,
    });
    req.user.credits += 5;
    const user = await req.user.save();
    res.send(user);
  } catch (error) {
    return response.status(500).send(error);
  }
});

module.exports = billingRouter;
