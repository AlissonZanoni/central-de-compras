const mongoose = require('mongoose');

const storeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  cnpj: {
    type: String,
    required: true,
    unique: true
  },
  address: {
    type: String,
    required: true
  },
  phone_number: {
    type: String,
    required: true
  },
  contact_email: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['on', 'off'],
    default: 'on'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Store', storeSchema);
