const mongoose = require('../mongoose');

const productSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  thumbnail: String,
  code: String,
  stock: Number,
  category: String,
  thumbnails: [String],
});

const ProductModel = mongoose.model('Product', productSchema);

module.exports = ProductModel;