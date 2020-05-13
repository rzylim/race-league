const { Series } = require("../models/Series");
const { Region } = require("../models/Region");
const { Tier } = require("../models/Tier");
const { Game } = require("../models/Game");
const { Championship } = require("../models/Championship");
const { Role } = require("../models/Role");

module.exports = (app) => {
  app.get("/api/uidata", async (req, res) => {
    try {
      const series = await Series.find({}).populate("games");
      const regions = await Region.find({});
      const tiers = await Tier.find({});
      const games = await Game.find({});
      const championships = await Championship.find({})
        .populate("series")
        .populate("game")
        .populate("region")
        .populate("tier");
      const roles = await Role.find({});
      res.send({ series, regions, tiers, games, championships, roles });
    } catch (error) {
      res.send(error);
    }
  });
};
