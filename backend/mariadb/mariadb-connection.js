const mariadb = require("mariadb");

const pool = mariadb.createPool({
    database: process.env.DATABASE,
    host: process.env.HOST,
    user: process.env.DB_USER,
    password: process.env.PASSWORD,
    connectionLimit: 100
});

module.exports = pool;