const mongoose = require("mongoose");

const carSchema = new mongoose.Schema({
  model: {
    type: String,
    maxlength: [20, "Must be 20 characters or less"],
    required: true,
  },
  make: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
});
const Car = mongoose.model("Car", carSchema);

module.exports = { carSchema, Car };
