const express = require("express");
const router = express.Router();
const pool = require('../mariadb/mariadb-connection');

// Get Users
router.get("/", async (req, res) => {
  const connection = await pool.getConnection();
  const query = `
  SELECT created_on, user_id, date_of_birth, user_name, email, legal_person, terms_accepted
  FROM users;`
  const result = await connection.query(query);
  res.status(200).send(result);
});

// Create a new User
router.post("/", async (req, res) => {
  const connection = await pool.getConnection();
  const fields = req.fields;

  // TODO: A "fields.referal_id" nyilván nem a legszebb, mert így össze vannak konkatenálva az értékek, de sajnos nincs most időm megvalósítani egy many-to-many kapcsolatot erre.
  const usersQuery = `
  INSERT INTO users (created_on, date_of_birth, user_name, email, hearing, password, legal_person, terms_accepted)
  VALUES (CURRENT_TIMESTAMP(), ${fields.dateOfBirth}, "${fields.userName}", "${fields.email}", "${fields.hearingId}", "${fields.password}", ${JSON.parse(fields.legalPerson)}, ${JSON.parse(fields.termsAccepted)});`

  await connection.query(usersQuery);
  res.status(200).send('OK');
});

module.exports = router;
