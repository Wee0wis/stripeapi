const express = require("express");
const Stripe = require("stripe");
const stripe = new Stripe("sk_test_51P36GFFdPKezsxxPtWoyQnXgTZrIGdhvzrrjtzlIfUDKAQEPKC36hzhoSySgHTzFI4m3iPrEJItFpBVU4MQtCp0S00OMx6vvBG");

const cors = require("cors");

const app = express();

app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());

app.post("/api/checkout", async (req, res) => {
  const { id, amount } = req.body;

  try {
    const payment = await stripe.paymentIntents.create({
      amount,
      currency: "USD",
      description: "Skin Care bellaca",
      payment_method: id,
      confirm: true,
      automatic_payment_methods: {
        enabled: true,
        allow_redirects: "never", // Deshabilita los métodos que requieren redirección
      },
    });

    console.log(payment);

    return res.status(200).json({ message: "Si se pago, awevo" });
  } catch (error) {
    console.log(error);
    return res.json({ message: error.raw.message });
  }
});

app.listen(3001, () => {
  console.log("Server on port", 3001);
});