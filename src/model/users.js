const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    allowNull: false,
  },
  password: {
    type: String,
    required: true,
    allowNull: false,
  },
  best_time: {
    type: Number,
    allowNul: true,
    default: Number.MAX_SAFE_INTEGER
  }
})

module.exports = mongoose.model('Users', userSchema)