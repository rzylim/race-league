const mongoose = require("mongoose");

// plain store of created regions.
const regionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
});
const Region = mongoose.model("Region", regionSchema);

module.exports = { regionSchema, Region };
