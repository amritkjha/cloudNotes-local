const mongoose = require('mongoose')
const { Schema } = mongoose;
const userSchema = new Schema({
    name: {
      type: String,
      required:  true
    },
    email: {
        type: String,
        required:  true,
        unique: true
    },
    password: {
        type: String,
        required:  true
      },
    date: {
        type: Date,
        default: Date.now
    }
  });
  async function run() {
    await mongoose.connect('mongodb://localhost:27017');
  }
  const User = mongoose.model('user', userSchema);
  module.exports = User