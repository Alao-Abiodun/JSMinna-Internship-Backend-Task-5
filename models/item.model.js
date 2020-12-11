const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const itemSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  reasons: {
    type: String,
    required: true,
  },
});

const model = mongoose.model('Item', itemSchema);

module.exports = model;
