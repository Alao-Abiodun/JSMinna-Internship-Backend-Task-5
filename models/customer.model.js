const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const customerSchema = new Schema({
  fullname: {
    type: String,
    trim: true,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    lowercase: true,
    required: true,
  },
  phone_number: String,
  address: String,
  gender: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const model = mongoose.model('Customer', customerSchema);

module.exports = model;
