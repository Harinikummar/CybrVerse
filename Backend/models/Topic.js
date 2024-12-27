const mongoose = require('mongoose');

const topicSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  description: { type: String, required: true },
  videoLink: { type: String },
  referenceLink: { type: String }
});

module.exports = mongoose.model('Topic', topicSchema);
