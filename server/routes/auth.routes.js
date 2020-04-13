const authRouter = require("express").Router();
const passport = require("passport");

authRouter.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

authRouter.get("/github", passport.authenticate("github"));

authRouter.get("/google/callback", passport.authenticate("google"));

authRouter.get("/github/callback", passport.authenticate("github"));

authRouter.get("/api/logout", (req, res) => {
  req.logout();
  res.send("logged out");
});

authRouter.get("/api/current-user", (req, res) => {
  res.send(req.user);
});

module.exports = authRouter;
