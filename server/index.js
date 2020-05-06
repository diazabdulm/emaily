const express = require("express");
const passport = require("passport");
const cookieSession = require("cookie-session");
const keys = require("./config/keys");
const PORT = process.env.PORT || 5000;
const app = express();

require("mongoose").connect(keys.mongoURI);

require("./models/User");
require("./models/Survey");
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
const surveysRouter = require("./routes/surveys.routes");

app.use("/auth", authRouter);
app.use("/billing", billingRouter);
app.use("/surveys", surveysRouter);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  const path = require("path");
  app.get("*", (require, response) => {
    response.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.listen(PORT);
