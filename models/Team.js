const mongoose = require("mongoose");

const teamSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  car: {
    type: { type: mongoose.Schema.OBjectId, ref: "Car" },
    required: true,
  },
});
const Team = mongoose.model("Team", teamSchema);

exports.Team = Team;