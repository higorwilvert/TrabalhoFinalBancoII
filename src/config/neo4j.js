const neo4j = require("neo4j-driver");

const driver = neo4j.driver(
    process.env.NEO4J_URI,
    neo4j.auth.basic(process.env.NEO4J_USERNAME, process.env.NEO4J_PASSWORD)
  );

const connectNeo4j = () => {
  try {
    console.log("Neo4j conectado!");
    return driver;
  } catch (error) {
    console.error("Erro ao conectar ao Neo4j:", error);
    process.exit(1);
  }
};

module.exports = connectNeo4j;
