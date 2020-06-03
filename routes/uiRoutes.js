const { Series } = require("../models/Series");
const { Region } = require("../models/Region");
const { Tier } = require("../models/Tier");
const { Championship } = require("../models/Championship");
const { Game } = require("../models/Game");
const { Car } = require("../models/Car");
const { Track } = require("../models/Track");
const { Role } = require("../models/Role");

module.exports = (app) => {
  app.get("/api/uidata", async (req, res) => {
    try {
      const series = await Series.find({}).select("-__v").populate("games");
      const regions = await Region.find({}).select("-__v");
      const tiers = await Tier.find({}).select("-__v");
      const championships = await Championship.find({})
        .select("-__v")
        .populate("series")
        .populate("game")
        .populate("region")
        .populate("tier");
      const games = await Game.find({}).select("-__v");
      const cars = await Car.find({}).select("-__v");
      const tracks = await Track.find({}).select("-__v");
      const roles = await Role.find({}).select("-__v");
      res.send({
        series,
        regions,
        tiers,
        championships,
        games,
        cars,
        tracks,
        roles,
      });
    } catch (error) {
      res.send(error);
    }
  });
};
