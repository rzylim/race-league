const passport = require("passport");
const DiscordStrategy = require("@oauth-everything/passport-discord").Strategy;
const JwtStrategy = require("passport-jwt").Strategy;
const mongoose = require("mongoose");

const User = mongoose.model("users");

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

passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: req => req.cookies.jwt,
      secretOrKey: process.env.JWT_KEY
    },
    (jwtPayload, done) => {
      try {
        if (Date.now() > jwtPayload.expires) {
          return done("jwt expired");
        }
        return done(null, jwtPayload);
      } catch (error) {
        done(error);
      }
    }
  )
);
