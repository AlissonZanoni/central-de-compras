const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  stock_quantity: {
    type: Number,
    required: true
  },
  supplier_id: {
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

module.exports = mongoose.model('Product', productSchema);
