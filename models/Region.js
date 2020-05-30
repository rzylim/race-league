const mongoose = require("mongoose");

// plain store of created regions.
const regionSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    minlength: [2, "Must be 2 characters or more"],
    maxlength: [15, "Must be 15 characters or less"],
  },
});
const Region = mongoose.model("Region", regionSchema);

module.exports = { regionSchema, Region };
