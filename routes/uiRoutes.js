const { Series } = require("../models/Series");
const { Championship } = require("../models/Championship");
const { Role } = require("../models/Role");

module.exports = (app) => {
  app.get("/api/uidata", async (req, res) => {
    try {
      const series = await Series.find({});
      const championships = await Championship.find({})
        .populate("series")
        .populate("game")
        .populate("region")
        .populate("tier");
      const roles = await Role.find({});
      res.send({ series, championships, roles });
    } catch (error) {
      res.send(error);
    }
  });
};
