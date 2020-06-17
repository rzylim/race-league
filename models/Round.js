const mongoose = require("mongoose");

const roundSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    minlength: [2, "Must be 2 characters or more"],
    maxlength: [15, "Must be 15 characters or less"],
  },
  date: {
    type: Date,
    required: true,
  },
});
const Round = mongoose.model("Round", roundSchema);

module.exports = { roundSchema, Round };
