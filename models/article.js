
const mongoose = require('mongoose');
const validator = require('validator');

const cardSchema = new mongoose.Schema({
  keyword: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  source: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    validate: {
      validator: (v) => validator.isURL(v),
      message: 'Неправильный формат url',
    },
    required: true,
  },
  image: {
    type: String,
    validate: {
      validator: (v) => validator.isURL(v),
      message: 'Неправильный формат url',
    },
    required: true,
  },
  owner: {
    type: String,
    required: true,
  },
});
module.exports = mongoose.model('article', cardSchema);
