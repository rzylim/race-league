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
});
const User = mongoose.model("users", userSchema);

module.exports = { userSchema, User };
