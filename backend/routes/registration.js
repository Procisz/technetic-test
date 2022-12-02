const express = require("express");
const router = express.Router();

// const Database = require("./../mariadb/mariadb-connection");
// const database = new Database();
const mariadb = require("mariadb");

const pool = mariadb.createPool({
  database: "technetics",
  host: "localhost",
  user: 'admin',
  password: 'admin',
});

/* GET users listing. */
router.get("/", async (req, res) => {
  conn = await pool.getConnection();
  const rows = await conn.query("SELECT * FROM users");
  const json = JSON.stringify(rows)

  res.send(rows);
});

module.exports = router;
