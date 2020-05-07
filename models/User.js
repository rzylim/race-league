const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  discordId: {
    type: String,
    required: true,
  },
  familyName: {
    type: String,
  },
  givenName: {
    type: String,
  },
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  nationality: {
    type: String,
  },
  role: {
    type: String,
  },
  seriesPermissions: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Series" }],
  },
  championshipPermissions: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Championship" }],
  },
});
const User = mongoose.model("User", userSchema);

module.exports = { userSchema, User };
