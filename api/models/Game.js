const mongoose = require('mongoose');

const Game = mongoose.model('Game', {
  title: String,
  genre: String,
  description: String,
  imageUrl: String,
  user_id: {type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

module.exports = Game