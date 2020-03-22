const passport = require("passport");
const jwt = require("jsonwebtoken");

module.exports = app => {
  app.get("/auth/discord", passport.authenticate("discord"));

  app.get("/auth/discord/callback", (req, res) => {
    passport.authenticate(
      "discord",
      {
        failureRedirect: "/",
        session: false
      },
      (error, user) => {
        if (error || !user) {
          res.status(400).json({ error });
        }

        // jwt content
        const payload = {
          ...user,
          expires: Date.now() + 30 * 24 * 60 * 60 * 1000
        };

        // assign payload to req.user
        req.login(payload, { session: false }, error => {
          if (error) {
            res.status(400).send({ error });
          }

          // generate a signed json web token and return it in the response
          const token = jwt.sign(JSON.stringify(payload), process.env.JWT_KEY);

          // assign jwt to cookie
          res.cookie("jwt", token);
          res.redirect("/");
        });
      }
    )(req, res);
  });

  app.get(
    "/api/current_user",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
      const { user } = req;
      res.status(200).send({ user });
    }
  );
};
