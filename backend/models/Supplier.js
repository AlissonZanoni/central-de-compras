const mongoose = require('mongoose');

const supplierSchema = new mongoose.Schema({
  supplier_name: {
    type: String,
    required: true
  },
  supplier_category: {
    type: String,
    required: true
  },
  contact_email: {
    type: String,
    required: true
  },
  phone_number: {
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

module.exports = mongoose.model('Supplier', supplierSchema);
