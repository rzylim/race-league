const mongoose = require("mongoose");

// tree structure to facilitate site display
const seriesSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  games: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Game" }],
    required: true,
  },
  link: {
    type: String,
    required: true,
    unique: true,
  },
});
const Series = mongoose.model("Series", seriesSchema);

module.exports = { seriesSchema, Series };
