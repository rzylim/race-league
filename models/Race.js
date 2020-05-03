const mongoose = require("mongoose");

const raceSchema = new mongoose.Schema({
  results: {
    type: [{ type: mongoose.Schema.OBjectId, ref: "Result" }],
    required: true,
  },
});
const Race = mongoose.model("Race", raceSchema);

exports.Race = Race;
