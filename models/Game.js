const mongoose = require("mongoose");

const gameSchema = new mongoose.Schema({
  name: {
    type: String,
    maxlength: [20, "Must be 20 characters or less"],
    unique: true,
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

module.exports = { gameSchema, Game };
