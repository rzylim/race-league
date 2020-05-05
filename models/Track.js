const mongoose = require("mongoose");

const trackSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
});
const Track = mongoose.model("Track", trackSchema);

module.exports = { trackSchema, Track };
