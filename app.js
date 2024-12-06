require("dotenv").config();
const express = require("express");
const connectMongoDB = require("./src/config/mongo");
const connectNeo4j = require("./src/config/neo4j");

const app = express();
const PORT = process.env.PORT || 3000;

connectMongoDB();
const neo4jDriver = connectNeo4j();

app.use(express.json());

app.use("/api", require("./src/routes"));

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
