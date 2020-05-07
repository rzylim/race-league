const mongoose = require("mongoose");

const roleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  static_permissions: {
    type: [String],
  },
  dynamic_permissions: {
    type: [String],
  },
});
const Role = mongoose.model("Role", roleSchema);

module.exports = { roleSchema, Role };
