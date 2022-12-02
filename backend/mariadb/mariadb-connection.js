const mariadb = require("mariadb");

// module.exports = class DataBase {
//   constructor() {
//     // pool.getConnection().then((connection) => (this.connection = connection));
//   }

//   async getRegistrations() {
//     let conn;
//     try {
//       conn = await pool.getConnection();
//       // const rows = await conn.query("SELECT * FROM users");
//       // console.log(rows);
//       // const res = await conn.query("INSERT INTO myTable value (?, ?)", [1, "mariadb"]);
//       // console.log(res); // { affectedRows: 1, insertId: 1, warningStatus: 0 }

//       const query = `SELECT * FROM users`;
//       console.log("conn", conn);
//       return await conn.query(query);
//     } catch (err) {
//       throw err;
//     } finally {
//       if (conn) return conn.end();
//     }

//   }
// };
