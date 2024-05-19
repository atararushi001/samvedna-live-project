const db = require("../config/db.config");
const { getById } = require("./recruiter.model");
const db_name = process.env.MYSQL_DATABASE;

const blog = {
  getAll: (callback) => {
    db.query(`SELECT * FROM ${db_name}.blogs`, callback);
  },
  getById: (id, callback) => {
    db.query(`SELECT * FROM ${db_name}.blogs WHERE id = ?`, [id], callback);
  },
  create: (blog, callback) => {
    const { title, content, cover, author, published } = blog;

    db.query(
      `INSERT INTO ${db_name}.blogs (title, content, cover, author, published) VALUES (?, ?, ?, ?, ?)`,
      [title, content, cover, author, published],
      callback
    );
  },
  update: (id, blog, callback) => {
    const { title, content, cover, author } = blog;

    db.query(
      `UPDATE ${db_name}.blogs SET title = ?, content = ?, cover = ?, author = ? WHERE id = ?`,
      [title, content, cover, author, id],
      callback
    );
  },
  delete: (id, callback) => {
    db.query(`DELETE FROM ${db_name}.blogs WHERE id = ?`, [id], callback);
  },
};

module.exports = blog;
