const mongoose = require("mongoose");

const resultSchema = new mongoose.Schema({
  created_on: {
    type: Date,
    required: true,
  },
  modified_on: {
    type: Date,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  _championship: {
    type: { type: mongoose.Schema.OBjectId, ref: "Championship" },
    required: true,
  },
  _race: {
    type: { type: mongoose.Schema.OBjectId, ref: "Race" },
    required: true,
  },
  _track: {
    type: { type: mongoose.Schema.OBjectId, ref: "Track" },
    required: true,
  },
  _driver: {
    type: { type: mongoose.Schema.OBjectId, ref: "User" },
    required: true,
  },
  _car: {
    type: { type: mongoose.Schema.OBjectId, ref: "Car" },
    required: true,
  },
  _team: {
    type: { type: mongoose.Schema.OBjectId, ref: "Team" },
    required: true,
  },
  qualifying_time: {
    type: Date,
  },
  qualifying_position: {
    type: Number,
  },
  qualifying_tyre: {
    type: String,
  },
  qualifying_points: {
    type: Number,
  },
  grid_position: {
    type: Number,
    required: true,
  },
  race_time: {
    type: Date,
    required: true,
  },
  race_position: {
    type: Number,
    required: true,
  },
  race_tyres: {
    type: [String],
  },
  race_points: {
    type: Number,
  },
  penalties_num: {
    type: Number,
    required: true,
  },
  penalties_time: {
    type: Date,
    required: true,
  },
  fastest_lap: {
    type: Date,
    required: true,
  },
  driver_of_the_day: {
    type: Boolean,
    required: true,
  },
});
const Result = mongoose.model("Result", resultSchema);

exports.Result = Result;
