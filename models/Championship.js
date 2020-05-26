const mongoose = require("mongoose");

const championshipSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  abbreviation: {
    type: String,
    required: true,
  },
  series: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Series",
    required: true,
  },
  game: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Game",
    required: true,
  },
  region: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Region",
  },
  tier: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Tier",
    required: true,
  },
  teams: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Team" }],
  },
});
const Championship = mongoose.model("Championship", championshipSchema);

module.exports = { championshipSchema, Championship };
