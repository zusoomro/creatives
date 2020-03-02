const mongoose = require('mongoose');

const HouseSchema = new mongoose.Schema({
  admin: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  name: {
    type: String,
    required: true
  },
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  tasks: [
    {
      name: {
        type: String,
        required: true
      }
    }
  ]
});

module.exports = Profile = mongoose.model('Hours', HouseSchema);
