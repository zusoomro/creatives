const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  house: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'House'
  },
  date: {
    type: Date,
    default: Date.now
  }
});

UserSchema.methods.validatePassword = async function(inputPassword) {
  const hash = bcrypt.compare(intputPassword, this.password);
  return this.password === hash;
};

module.exports = User = mongoose.model('User', UserSchema);
