const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const GithubStrategy = require("passport-github").Strategy;
const mongoose = require("mongoose");
const keys = require("../config/keys");

const User = mongoose.model("users");

passport.serializeUser(({ id }, done) => done(null, id));

passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  return done(null, user);
});

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback",
    },
    async (accessToken, refreshToken, { id }, done) => {
      const existingUser = await User.findOne({ googleID: id });
      if (existingUser) return done(null, existingUser);

      const newUser = await new User({ googleID: id }).save();
      done(null, newUser);
    }
  )
);

passport.use(
  new GithubStrategy(
    {
      clientID: keys.githubClientID,
      clientSecret: keys.githubClientSecret,
      callbackURL: "/auth/github/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      const existingUser = await User.findOne({ githubID: profile.id });
      if (existingUser) return done(null, existingUser);

      const newUser = await new User({ githubID: profile.id }).save();
      done(null, newUser);
    }
  )
);
