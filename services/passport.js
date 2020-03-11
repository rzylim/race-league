const passport = require("passport");
const DiscordStrategy = require("@oauth-everything/passport-discord").Strategy;
const mongoose = require("mongoose");

const User = mongoose.model("users");

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

passport.use(
  new DiscordStrategy(
    {
      clientID: process.env.DISCORD_CLIENT_ID,
      clientSecret: process.env.DISCORD_CLIENT_SECRET,
      callbackURL: "/auth/discord/callback",
      scope: ["identify", "email"]
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const existingUser = await User.findOne({ discordId: profile.id });
        if (existingUser) {
          done(null, existingUser);
        } else {
          const newUser = await new User({
            discordId: profile.id,
            username: profile.username,
            email: profile.emails[0].value
          }).save();
          done(null, newUser);
        }
      } catch (error) {
        done(error, null);
      }
    }
  )
);
