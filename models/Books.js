const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    summary: {
      type: String,
      required: true,
    },
    publisher: {
      type: String,
      required: true,
    },
    pageCount: {
      type: Number,
      required: true,
    },
    readPage: {
      type: Number,
      required: true,
    },
    finished: {
      type: Boolean,
      required: true,
    },
    reading: {
      type: Boolean,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Movie', movieSchema);
