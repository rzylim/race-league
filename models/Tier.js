const mongoose = require("mongoose");

// plain store of created tiers.
const tierSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    maxlength: [15, "Must be 15 characters or less"],
  },
  colour: {
    type: String,
  },
});
const Tier = mongoose.model("Tier", tierSchema);

module.exports = { tierSchema, Tier };
