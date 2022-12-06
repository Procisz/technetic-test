const express = require("express");
const router = express.Router();
const pool = require('../mariadb/mariadb-connection');

// Get Invitations
router.get("/", async (req, res) => {
  const connection = await pool.getConnection();
  const query = `SELECT * FROM invitations;`
  const result = await connection.query(query);
  res.status(200).send(result);
});

// Send the invitations
router.post("/", async (req, res) => {
  const connection = await pool.getConnection();
  const invitations = req.fields.invitations;

  let queryValues = ``;

  JSON.parse(invitations).forEach((invitation, index) => {
    queryValues += `(CURRENT_TIMESTAMP(), ${invitation.invited_by}, "${invitation.email}", false)`;
    queryValues += JSON.parse(invitations).length !== index + 1 ? ',' : '';
  });

  const finalQuery = `
  INSERT INTO invitations (created_on, invited_by, email, invitation_accepted)
  VALUES ${queryValues};`

  await connection.query(finalQuery);
  res.status(200).send('OK');


  // TODO: Ezt nem tudtam befejezni, nodemailert használnék az email kiküldésére - szerény backend tudásom miatt...
});

module.exports = router;
