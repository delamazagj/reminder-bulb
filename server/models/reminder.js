const mongoose = require('mongoose');

const reminderSchema = mongoose.Schema({
  title: { type: String, require: true },
  content: { type: String, require: true }
});

module.exports = mongoose.model('Reminder', reminderSchema);
