const mongoose = require("mongoose");

const raceSchema = new mongoose.Schema({
  results: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Result" }],
    required: true,
  },
});
const Race = mongoose.model("Race", raceSchema);

exports.Race = Race;
