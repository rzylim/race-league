const express = require("express");
const router = express.Router();
const passport = require("passport");

router.route("/discord").get(passport.authenticate("discord"));

router.route("/discord/callback").get(
  passport.authenticate("discord", {
    failureRedirect: "/",
  }),
  (req, res) => {
    res.redirect("/");
  }
);

router.route("/signout").get((req, res) => {
  req.logout();
  res.redirect("/");
});

router.route("/current_user").get((req, res) => {
  res.send(req.user);
});

module.exports = router;
