const mongoose = require("mongoose");

const teamSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: [2, "Must be 2 characters or more"],
    maxlength: [20, "Must be 20 characters or more"],
    required: true,
  },
});
const Team = mongoose.model("Team", teamSchema);

module.exports = { teamSchema, Team };
