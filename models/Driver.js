const mongoose = require("mongoose");
mongoose.connect(process.env.MONGO_URI);

const driverSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  nationality: {
    type: String,
    required: true
  }
});
const Driver = mongoose.model("Driver", driverSchema);

exports.Driver = Driver;
