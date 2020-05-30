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
      const series = await Series.find({}).populate("games");
      const regions = await Region.find({});
      const tiers = await Tier.find({});
      const championships = await Championship.find({})
        .populate("series")
        .populate("game")
        .populate("region")
        .populate("tier");
      const games = await Game.find({});
      const cars = await Car.find({});
      const tracks = await Track.find({});
      const roles = await Role.find({});
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
