require("dotenv").config();
const mongoose = require("mongoose");
const neo4j = require("neo4j-driver");

const testMongoDB = async () => {
  try {
    console.log("Conectando ao MongoDB...");
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB conectado com sucesso!");
    mongoose.disconnect();
  } catch (error) {
    console.error("Erro ao conectar ao MongoDB:", error);
  }
};

const testNeo4j = async () => {
  const driver = neo4j.driver(
    process.env.NEO4J_URI,
    neo4j.auth.basic(process.env.NEO4J_USERNAME, process.env.NEO4J_PASSWORD)
  );
  try {
    console.log("Conectando ao Neo4j...");
    const session = driver.session(); 
    const result = await session.run("RETURN 'Conexão bem-sucedida!' AS result");
    console.log(result.records[0].get("result")); 
    await session.close(); 
  } catch (error) {
    console.error("Erro ao conectar ao Neo4j:", error);
  } finally {
    await driver.close();
  }
};


// Testando Conexões
(async () => {
  console.log("Iniciando os testes...");
  await testMongoDB();
  await testNeo4j();
  console.log("Testes concluídos!");
})();