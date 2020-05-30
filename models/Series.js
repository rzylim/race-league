const mongoose = require("mongoose");

// tree structure to facilitate site display
const seriesSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: [2, "Must be 2 characters or more"],
    maxlength: [15, "Must be 15 characters or more"],
    unique: true,
  },
  link: {
    type: String,
    minlength: [2, "Must be 2 characters or more"],
    maxlength: [15, "Must be 15 characters or more"],
    unique: true,
  },
});
const Series = mongoose.model("Series", seriesSchema);

module.exports = { seriesSchema, Series };
