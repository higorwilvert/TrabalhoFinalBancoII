const express = require("express");
const router = express.Router();

const { getProducts, getClients } = require("../controllers/mongoController");
const { getFriends } = require("../controllers/neo4jController");

router.get("/produtos", getProducts);
router.get("/clientes", getClients);
router.get("/amigos", getFriends);

module.exports = router;
