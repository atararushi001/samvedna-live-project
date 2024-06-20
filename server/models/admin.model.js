const db = require("../config/db.config");
const db_name = process.env.MYSQL_DATABASE;

const Admin = {
  register: (admin, callback) => {
    const { username, password } = admin;

    db.query(
      `INSERT INTO ${db_name}.admins (username, password) VALUES (?, ?)`,
      [username, password],
      callback
    );
  },
  login: (username, callback) => {
    db.query(
      `SELECT * FROM ${db_name}.admins WHERE username = ?;`,
      [username],
      callback
    );
  },
};

module.exports = Admin;
