const mongoose = require("mongoose");
mongoose.connect(process.env.MONGO_URI);

const carSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  team: {
    type: String,
    required: true
  },
  year: {
    type: Number,
    required: true
  }
});
const Car = mongoose.model("Car", carSchema);

exports.Car = Car;
