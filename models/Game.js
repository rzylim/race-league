const mongoose = require("mongoose");

const gameSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  cars: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Car" }],
    required: true,
  },
  tracks: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Track" }],
    required: true,
  },
});
const Game = mongoose.model("Game", gameSchema);

module.xports = { gameSchema, Game };
