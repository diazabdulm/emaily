const app = require("express")();
const mongoose = require("mongoose");
const passport = require("passport");
const cookieSession = require("cookie-session");
const keys = require("./config/keys");
const PORT = process.env.PORT || 5000;

require("./models/User");
require("./services/passport");

app.use(cookieSession({
  maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days,
  keys: [keys.cookieKey]
}));
app.use(passport.initialize());
app.use(passport.session());

const authRouter = require("./routes/auth.routes");

mongoose.connect(keys.mongoURI);

app.use("/auth", authRouter);
app.listen(PORT);
