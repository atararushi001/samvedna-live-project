const db = require("../config/db.config");
const db_name = process.env.MYSQL_DATABASE;

const selfEmployed = {
  getAll: (callback) => {
    db.query(`SELECT * FROM ${db_name}.selfemployment`, callback);
  },
  create: (selfEmployed, callback) => {
    const {
      name,
      disabilityType,
      percentage,
      education,
      companyName,
      companyType,
      officeAddress,
      contactNumber,
      email,
      professionType,
      description,
      experience,
      assistanceNedeed,
      product,
    } = selfEmployed;

    db.query(
      `INSERT INTO ${db_name}.selfemployment (name, disabilityType, percentage, education, companyName, companyType, officeAddress, contactNumber, email, professionType, description, experience, assistanceNedeed) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        name,
        disabilityType,
        percentage,
        education,
        companyName,
        companyType,
        officeAddress,
        contactNumber,
        email,
        professionType,
        description,
        experience,
        assistanceNedeed,
      ],
      (err, result) => {
        if (err) {
          console.log(err);
          return callback(err, null);
        } else {
          let lastId = result.insertId;
          let count = 0;
          product.forEach((element) => {
            db.query(
              `INSERT INTO ${db_name}.product_selfemployment (self_employment_id, ps_details) VALUES (?, ?)`,
              [lastId, element],
              (err, result) => {
                if (err) {
                  console.log(err);
                  return callback(err, null);
                } else {
                  count++;
                  if (count == product.length) {
                    return callback(null, result);
                  }
                }
              }
            );
          });
        }
      }
    );
  },
};

module.exports = selfEmployed;
