const mongoose = require('mongoose');

const PhotoSchema = new mongoose.Schema(
  {
    url: {
      type: String
    },
    caption: {
      type: String
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    favoriteCount: {
      type: Number,
      default: 0
    },
    favoritedBy: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      }
    ]
  },
  {
    timestamps: true
  }
);

const Photo = mongoose.model('Photo', PhotoSchema);
module.exports = Photo;
