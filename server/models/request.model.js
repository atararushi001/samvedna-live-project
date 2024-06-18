const db = require("../config/db.config.js");
const db_name = process.env.MYSQL_DATABASE;

const Request = {
  create: (sender_id, receiver_id, callback) => {
    return db.query(
      `INSERT INTO ${db_name}.requests (sender_id, receiver_id) VALUES (?, ?)`,
      [sender_id, receiver_id],
      callback
    );
  },
  getAllUserRequests: (user_id, callback) => {
    return db.query(
      `SELECT * FROM ${db_name}.requests WHERE receiver_id = ? AND status = "Pending"`,
      [user_id],
      callback
    );
  },
  acceptRequest: (id, callback) => {
    return db.query(
      `UPDATE ${db_name}.requests SET status = "Accepted" WHERE id = ?`,
      [id],
      callback
    );
  },
  rejectRequest: (id, callback) => {
    return db.query(
      `UPDATE ${db_name}.requests SET status = "Rejected" WHERE id = ?`,
      [id],
      callback
    );
  },
  getAllPending: (user_id, callback) => {
    return db.query(
      `SELECT * FROM ${db_name}.requests WHERE sender_id = ? AND status = "Pending"`,
      [user_id],
      callback
    );
  },
};

module.exports = Request;
