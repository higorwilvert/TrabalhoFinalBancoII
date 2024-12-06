const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  idprod: Number,
  produto: String,
  quantidade: Number,
  preco: Number,
});

module.exports = mongoose.model("Product", ProductSchema);
