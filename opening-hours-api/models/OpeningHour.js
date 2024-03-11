// models/OpeningHour.js

const mongoose = require('mongoose');

const OpeningHourSchema = new mongoose.Schema({
  dayOfWeek: { type: Number, required: true }, // 0 for Sunday, 1 for Monday, ..., 6 for Saturday
  openTime: { type: String, required: true },
  closeTime: { type: String, required: true }
});

module.exports = mongoose.model('OpeningHour', OpeningHourSchema);
