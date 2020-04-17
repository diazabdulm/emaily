const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const cookieSession = require("cookie-session");
const keys = require("./config/keys");
const PORT = process.env.PORT || 5000;
const app = express();

require("./models/User");
require("./services/passport");

app.use(express.json());
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days,
    keys: [keys.cookieKey],
  })
);
app.use(passport.initialize());
app.use(passport.session());

const authRouter = require("./routes/auth.routes");
const billingRouter = require("./routes/billing.routes");

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  const path = require("path");
  app.get("*", (require, response) => {
    response.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

mongoose.connect(keys.mongoURI);

app.use("/auth", authRouter);
app.use("/billing", billingRouter);

app.listen(PORT);
