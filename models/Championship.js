const mongoose = require("mongoose");

const championshipSchema = new mongoose.Schema({
  series: {
    type: { type: mongoose.Schema.OBjectId, ref: "Series" },
    required: true,
  },
  game: {
    type: { type: mongoose.Schema.OBjectId, ref: "Game" },
    required: true,
  },
  region: {
    type: { type: mongoose.Schema.OBjectId, ref: "Region" },
    required: true,
  },
  tier: {
    type: { type: mongoose.Schema.OBjectId, ref: "Tier" },
    required: true,
  },
  teams: {
    type: [{ type: mongoose.Schema.OBjectId, ref: "Team" }],
  },
});
const Championship = mongoose.model("Championship", championshipSchema);

exports.Championship = Championship;
