const express = require("express");
const router = express.Router();
const pool = require('../mariadb/mariadb-connection');

// Get hearing options
router.get("/", async (req, res) => {
  const connection = await pool.getConnection();
  const query = `SELECT * FROM referals;`
  const result = await connection.query(query);
  res.status(200).send(result);
});

module.exports = router;
