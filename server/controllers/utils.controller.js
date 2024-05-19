const utils = require("../models/utils.model");

const utilsController = {
  getCountries: (req, res) => {
    utils.getCountries((err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ message: "Database connection error" });
      }
      return res.status(200).json({ results });
    });
  },
  getAllCities: (req, res) => {
    utils.getAllCities((err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ message: "Database connection error" });
      }
      return res.status(200).json({ results });
    });
  },
  getStatesById: (req, res) => {
    const countryId = req.params.countryId;
    utils.getStatesById(countryId, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ message: "Database connection error" });
      }
      return res.status(200).json({ results });
    });
  },
  getCitiesById: (req, res) => {
    const stateId = req.params.stateId;
    utils.getCitiesById(stateId, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ message: "Database connection error" });
      }
      return res.status(200).json({ results });
    });
  },
  getAllProfessions: (req, res) => {
    utils.getAllProfessions((err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ message: "Database connection error" });
      }
      return res.status(200).json({ results });
    });
  },
  getAllQualifications: (req, res) => {
    utils.getAllQualifications((err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ message: "Database connection error" });
      }
      return res.status(200).json({ results });
    });
  },
  getEducationSpecializationById: (req, res) => {
    const qualificationId = req.params.qualificationId;
    utils.getEducationSpecializationById(qualificationId, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ message: "Database connection error" });
      }
      return res.status(200).json({ results });
    });
  },
  getLatestJobs: (req, res) => {
    utils.getLatestJobs((err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ message: "Database connection error" });
      }
      return res.status(200).json({ results });
    });
  },
  submitContact: (req, res) => {
    const newContact = req.body;
    utils.submitContact(newContact, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ message: "Database connection error" });
      }
      return res
        .status(201)
        .json({ message: "Contact Form submitted successfully" });
    });
  },
  getJobById: (req, res) => {
    const id = req.params.id;
    utils.getJobById(id, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ message: "Database connection error" });
      }
      return res.status(200).json({ results });
    });
  },
};

module.exports = utilsController;
