const mongoose = require('mongoose');

const workoutSchema = new mongoose.Schema({
  userId: {
        type: String,
        required: [true, 'User ID is Required.']
    },
  name: {
    type: String,
    required: [true, 'Workout name is required']
  },
   type: {
    type: String,
    required: [true, 'Workout type is required']
  },
  duration: {
    type: String,
    required: [true, 'Duration is required']
  },
  status: {
    type: String,
  },
  dateAdded: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Workout', workoutSchema);

