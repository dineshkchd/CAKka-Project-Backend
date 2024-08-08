// src/models/Schedule.js
const mongoose = require('mongoose');

const ScheduleSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  isBooked: {
    type: Boolean,
    default: false,
  },
  bookedBy: {
    type: String,
    default: null,
  },
});

const Schedule = mongoose.model('Schedule', ScheduleSchema);

module.exports = Schedule;
