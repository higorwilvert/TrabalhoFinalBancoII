const neo4jDriver = require("../config/neo4j")();

const getFriends = async (req, res) => {
  const session = neo4jDriver.session();
  try {
    const result = await session.run(`
      MATCH (c:Cliente)-[:AMIGO_DE]->(a:Cliente) 
      RETURN c, a
    `);

    const friends = result.records.map((record) => ({
      cliente: record.get("c").properties,
      amigo: record.get("a").properties,
    }));
    res.json(friends);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar amigos" });
  } finally {
    session.close();
  }
};

module.exports = { getFriends };
