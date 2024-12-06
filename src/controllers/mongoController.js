const Product = require("../models/Product");
const Client = require("../models/Client");

const getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar produtos" });
  }
};

const getClients = async (req, res) => {
  try {
    const clients = await Client.find({});
    res.json(clients);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar clientes" });
  }
};

module.exports = { getProducts, getClients };
