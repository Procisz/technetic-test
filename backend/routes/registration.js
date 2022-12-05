const express = require("express");
const router = express.Router();
const pool = require('./../mariadb/mariadb-connection');

/* GET users listing. */
router.get("/", async (req, res) => {
  const connection = await pool.getConnection();
  const query = `
  SELECT created_on, user_id, birthday, user_name, email, private, terms_accepted
  FROM users;`
  const result = await connection.query(query);
  res.status(200).send(result);
});

module.exports = router;
