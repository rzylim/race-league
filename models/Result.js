const mongoose = require("mongoose");
mongoose.connect(process.env.MONGO_URI);

const resultSchema = new mongoose.Schema({
  created_on: {
    type: Date,
    required: true
  },
  modified_on: {
    type: Date,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  championship_id: {
    type: Number,
    required: true
  },
  season_id: {
    type: Number,
    required: true
  },
  race_id: {
    type: Number,
    required: true
  },
  track_id: {
    type: String,
    required: true
  },
  _driver: {
    type: { type: mongoose.Schema.OBjectId, ref: "User" },
    required: true
  },
  _car: {
    type: { type: mongoose.Schema.OBjectId, ref: "Car" },
    required: true
  },
  team: {
    type: String,
    required: true
  },
  qualifying_time: {
    type: Date
  },
  qualifying_position: {
    type: Number
  },
  qualifying_tyre: {
    type: String
  },
  qualifying_points: {
    type: Number
  },
  grid_position: {
    type: Number,
    required: true
  },
  race_time: {
    type: Date,
    required: true
  },
  race_position: {
    type: Number,
    required: true
  },
  race_tyres: {
    type: [String]
  },
  race_points: {
    type: Number
  },
  penalties_num: {
    type: Number,
    required: true
  },
  penalties_time: {
    type: Date,
    required: true
  },
  fastest_lap: {
    type: Date,
    required: true
  },
  driver_of_the_day: {
    type: Boolean,
    required: true
  }
});
const Result = mongoose.model("Result", resultSchema);

exports.Result = Result;
