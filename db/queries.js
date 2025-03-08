const pool = require("./pool");

async function exampleInsert(username, text) {
  await pool.query(`INSERT INTO messages (username, text) VALUES ($1, $2)`, [
    username,
    text,
  ]);
}

module.exports = {
  exampleInsert
};
