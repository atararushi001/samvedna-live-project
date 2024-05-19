const db = require("../config/db.config");
const db_name = process.env.MYSQL_DATABASE;

const utils = {
  getCountries: (callback) => {
    db.query(`SELECT DISTINCT * FROM ${db_name}.country`, callback);
  },
  getAllCities: (callback) => {
    db.query(`SELECT DISTINCT * FROM ${db_name}.cities`, callback);
  },
  getStatesById: (countryId, callback) => {
    db.query(
      `SELECT DISTINCT * FROM ${db_name}.states WHERE country_id = ?`,
      [countryId],
      callback
    );
  },
  getCitiesById: (stateId, callback) => {
    db.query(
      `SELECT DISTINCT * FROM ${db_name}.cities WHERE state_id = ?`,
      [stateId],
      callback
    );
  },
  getAllProfessions: (callback) => {
    db.query(`SELECT * FROM ${db_name}.professions`, callback);
  },
  getAllQualifications: (callback) => {
    db.query(`SELECT * FROM ${db_name}.qualificationlevel`, callback);
  },
  getEducationSpecializationById: (qualificationId, callback) => {
    db.query(
      `SELECT * FROM ${db_name}.educationspecialization WHERE qualification_id = ?`,
      [qualificationId],
      callback
    );
  },
  getLatestJobs: (callback) => {
    db.query(
      `SELECT DISTINCT j.job_id, j.companyName, j.jobDesignation, j.jobType, j.city, j.disabilityInfoPercentage, j.disabilityInfoType, j.dutyDescription, r.profilePicture, c.name as cityname FROM ${db_name}.job j INNER JOIN ${db_name}.recruiters r ON j.recruiter_id = r.recruiters_id JOIN ${db_name}.cities as c ON j.city = c.id ORDER BY j.job_id DESC;`,
      callback
    );
  },
  submitContact: (newContact, callback) => {
    const { name, email, contact, address, message } = newContact;

    db.query(
      `INSERT INTO ${db_name}.contact_query (name, email, contact, address, message) VALUES (?, ?, ?, ?, ?)`,
      [name, email, contact, address, message],
      callback
    );
  },
  getJobById: (id, callback) => {
    db.query(
      `SELECT DISTINCT ${db_name}.job.*, ${db_name}.recruiters.profilePicture, ${db_name}.cities.name as cityname, ${db_name}.states.name as statename, ${db_name}.country.name as countryname FROM ${db_name}.job JOIN ${db_name}.recruiters ON ${db_name}.job.recruiter_id = ${db_name}.recruiters.recruiters_id JOIN ${db_name}.cities on ${db_name}.job.city = ${db_name}.cities.id JOIN ${db_name}.states on ${db_name}.job.state = ${db_name}.states.id JOIN ${db_name}.country on ${db_name}.job.country = ${db_name}.country.id WHERE ${db_name}.job.job_id = ?`,
      [id],
      callback
    );
  },
};

module.exports = utils;
