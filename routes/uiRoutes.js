const express = require("express");
const router = express.Router();

const checkPermissions = require("../client/src/authorisation/authorisation");

const { Series } = require("../models/Series");
const { Region } = require("../models/Region");
const { Tier } = require("../models/Tier");
const { Championship } = require("../models/Championship");
const { Game } = require("../models/Game");
const { Car } = require("../models/Car");
const { Track } = require("../models/Track");
const { Team } = require("../models/Team");
const { Role } = require("../models/Role");
const { User } = require("../models/User");

router.route("/").get(async (req, res) => {
  try {
    const series = await Series.find({}).select("-__v").populate("games");
    const regions = await Region.find({}).select("-__v");
    const tiers = await Tier.find({}).select("-__v");
    const championships = await Championship.find({})
      .select("-__v")
      .populate("series")
      .populate("game")
      .populate("region")
      .populate("tier")
      .populate("drivers")
      .populate("teams");
    const games = await Game.find({}).select("-__v");
    const cars = await Car.find({}).select("-__v");
    const tracks = await Track.find({}).select("-__v");
    const teams = await Team.find({}).select("-__v");
    const roles = await Role.find({}).select("-__v");
    let omitUserPermissions = "";
    if (!checkPermissions(global.roles, req.user.role, ["dashboard:edit"])) {
      omitUserPermissions +=
        "-role -seriesPermissions -championshipPermissions";
    }
    const users = await User.find({}).select(
      "-__v -discordId -email " + omitUserPermissions
    );
    res.send({
      series,
      regions,
      tiers,
      championships,
      games,
      cars,
      tracks,
      teams,
      roles,
      users,
    });
  } catch (error) {
    res.send(error);
  }
});

module.exports = router;
