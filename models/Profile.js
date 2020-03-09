const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectID,
    ref: 'User'
  },
  year: {
    type: String
  },
  skills: {
    type: [String],
    required: true
  },
  bio: {
    type: String,
    required: true
  },
  social: {
    soundcloud: {
      type: String
    },
    imgur: {
      type: String
    },
    instagram: {
      type: String
    },
    github: {
      type: String
    }
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Profile = mongoose.model('Profile', ProfileSchema);
