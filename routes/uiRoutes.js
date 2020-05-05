const { Series } = require("../models/Series");

module.exports = (app) => {
  app.get("/api/series", async (req, res) => {
    try {
      const series = await Series.find({});
      console.log(series);
      res.send(series);
    } catch (error) {
      res.send(error);
    }
  });
};
