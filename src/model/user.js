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
    type: Integer,
    allowNul: true,
  }
})

module.exports = mongoose.model('Users', userSchema)