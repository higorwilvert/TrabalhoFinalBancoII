const mongoose = require("mongoose");

const ClientSchema = new mongoose.Schema({
  idcliente: Number,
  cpf: String,
  nome: String,
  email: String,
  endereco: {
    rua: String,
    numero: Number,
    complemento: String,
    cidade: String,
    uf: String,
    cep: String,
  },
  compras: [
    {
      idcompra: Number,
      idprod: Number,
      data: String,
      quantidade: Number,
      valorpago: Number,
    },
  ],
});

module.exports = mongoose.model("Client", ClientSchema);
