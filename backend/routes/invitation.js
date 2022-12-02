const express = require("express");
const router = express.Router();
const pool = require('../mariadb/mariadb-connection');

/* GET users listing. */
router.get("/", async (req, res) => {
  const connection = await pool.getConnection();
  const query = `SELECT * FROM invitations`

  const result = await connection.query(query);
  const json = JSON.stringify(result)

  res.send(result);
});

module.exports = router;
