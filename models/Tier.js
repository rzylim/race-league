const mongoose = require("mongoose");

// plain store of created tiers.
const tierSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  colour: {
    type: String,
  },
});
const Tier = mongoose.model("Tier", tierSchema);

module.exports = { tierSchema, Tier };
