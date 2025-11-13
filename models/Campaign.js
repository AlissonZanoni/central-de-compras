const mongoose = require('mongoose');

const campaignSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  start_date: {
    type: String,
    required: true
  },
  end_date: {
    type: String,
    required: true
  },
  discount_percentage: {
    type: String,
    required: true
  },
  store_id: {
    type: String,
    required: true
  },
  item: {
    type: String,
    required: true
  },
  total_amount: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Campaign', campaignSchema);
