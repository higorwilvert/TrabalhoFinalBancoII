require("dotenv").config();
const mongoose = require("mongoose");
const connectMongoDB = require("./src/config/mongo");
const connectNeo4j = require("./src/config/neo4j");
const Product = require("./src/models/Product");
const Client = require("./src/models/Client");

const seedMongoDB = async () => {
  await Product.insertMany([
    { idprod: 1, produto: "Cadeira", quantidade: 100, preco: 199.99 },
    { idprod: 2, produto: "Mesa", quantidade: 50, preco: 399.99 },
  ]);

  await Client.insertMany([
    {
      idcliente: 1,
      cpf: "12345678900",
      nome: "Higor",
      email: "higor@wilvert.com",
      endereco: {
        rua: "Rua Flores",
        numero: 123,
        complemento: "Casa",
        cidade: "Chapecó",
        uf: "SC",
        cep: "89801-000",
      },
      compras: [
        {
          idcompra: 1,
          idprod: 1,
          data: "2024-12-01",
          quantidade: 2,
          valorpago: 399.99,
        },
      ],
    },
    {
      idcliente: 2,
      cpf: "98765432100",
      nome: "Maurício",
      email: "mauricio@maumau.com",
      endereco: {
        rua: "Avenida Central",
        numero: 456,
        complemento: "Apartamento 202",
        cidade: "Florianópolis",
        uf: "SC",
        cep: "88010-000",
      },
      compras: [
        {
          idcompra: 2,
          idprod: 2,
          data: "2024-12-02",
          quantidade: 1,
          valorpago: 399.99,
        },
      ],
    },
  ]);
  console.log("MongoDB populado com sucesso!");
};

const seedNeo4j = async () => {
  const driver = connectNeo4j();
  const session = driver.session();

  try {
    await session.run(`
        CREATE (h:Cliente {cpf: '12345678900', nome: 'Higor', telefone: '99999-9999', cidade: 'Chapecó', uf: 'SC'})
        CREATE (m:Cliente {cpf: '98765432100', nome: 'Maurício', telefone: '88888-8888', cidade: 'Florianópolis', uf: 'SC'})
        CREATE (h)-[:AMIGO_DE]->(m)
        CREATE (m)-[:AMIGO_DE]->(h)
    `);

    console.log("Neo4j populado com sucesso!");
  } catch (error) {
    console.error("Erro ao popular Neo4j:", error);
  } finally {
    await session.close();
    driver.close();
  }
};

(async () => {
  try {
    await connectMongoDB();
    await seedMongoDB();
    await seedNeo4j();
    console.log("Seed concluído com sucesso!");
    process.exit(0);
  } catch (error) {
    console.error("Erro ao executar seed:", error);
    process.exit(1);
  }
})();
