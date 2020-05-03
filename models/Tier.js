const mongoose = require("mongoose");

// plain store of created tiers.
const tierSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
});
const Tier = mongoose.model("Tier", tierSchema);

exports.Tier = Tier;
