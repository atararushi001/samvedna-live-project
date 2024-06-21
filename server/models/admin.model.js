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
  getUsersCount: (callback) => {
    db.query(
      `SELECT 
      (SELECT COUNT(*) FROM recruiters) as recruiters, 
      (SELECT COUNT(*) FROM job_seekers) as jobSeekers, 
      (SELECT COUNT(*) FROM selfemployment) as selfEmployed, 
      (SELECT COUNT(*) FROM matrimony) as matrimonyUsers`,
      [],
      (error, results) => {
        if (error) {
          callback(error);
        }
        callback(null, results[0]);
      }
    );
  },
  getRecruiters: (callback) => {
    db.query(
      `
      SELECT DISTINCT recruiters.*, cities.name as cityName, states.name as stateName, country.name as countryName 
      FROM ${db_name}.recruiters 
      JOIN cities ON recruiters.city = cities.id 
      JOIN states ON recruiters.state = states.id 
      JOIN country ON recruiters.country = country.id
    `,
      [],
      callback
    );
  },
};

module.exports = Admin;
