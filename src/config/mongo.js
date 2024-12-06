const mongoose = require("mongoose");

const connectMongoDB = async () => {
  try {
    console.log("Conectando ao MongoDB...");
    await mongoose.connect(process.env.MONGO_URI);
  } catch (error) {
    console.error("Erro ao conectar ao MongoDB:", error);
  }
};

module.exports = connectMongoDB;