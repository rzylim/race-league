const Driver = require("./models/Driver");
const Car = require("./models/Car");
const Result = require("./models/Result");

module.exports = function(app) {
  app.route("/api/:driverId").get(async (req, res) => {
    console.log("test");
    try {
      // let data = await Result.find({ driverId: req.params.driverId });
    } catch (error) {
      res.json(error);
    }
  });
};
