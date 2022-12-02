const express = require("express");
const router = express.Router();
const pool = require('./../mariadb/mariadb-connection');

/* Check if the given email already exists in database. */
router.get("/", async (req, res) => {
  const connection = await pool.getConnection();

  const query = `
    SELECT COUNT(users.email) as numberOfEmails
    FROM users 
    WHERE email = "${req.query.email}";
  `
  const result = await connection.query(query);
  res.send(Number(result[0].numberOfEmails) === 0 ? true : false)
});

module.exports = router;
