const mongoose = require("mongoose");

const championshipSchema = new mongoose.Schema({
  series: {
    type: { type: mongoose.Schema.Types.ObjectId, ref: "Series" },
    required: true,
  },
  game: {
    type: { type: mongoose.Schema.Types.ObjectId, ref: "Game" },
    required: true,
  },
  region: {
    type: { type: mongoose.Schema.Types.ObjectId, ref: "Region" },
    required: true,
  },
  tier: {
    type: { type: mongoose.Schema.Types.ObjectId, ref: "Tier" },
    required: true,
  },
  teams: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Team" }],
  },
});
const Championship = mongoose.model("Championship", championshipSchema);

exports.Championship = Championship;
