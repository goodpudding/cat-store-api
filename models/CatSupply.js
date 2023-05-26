const mongoose = require('mongoose');

const CatSupplySchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  inventory: Number,
  image: String,
});

module.exports = mongoose.model('CatSupply', CatSupplySchema);