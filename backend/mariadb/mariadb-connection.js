const mariadb = require("mariadb");

const pool = mariadb.createPool({
    database: "technetics",
    host: "localhost",
    user: 'admin',
    password: 'admin',
});

module.exports = pool;