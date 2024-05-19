const express = require("express");
const router = express.Router();

const utilsController = require("../controllers/utils.controller");

router.get("/countries", utilsController.getCountries);
router.get("/cities", utilsController.getAllCities);
router.get("/states/:countryId", utilsController.getStatesById);
router.get("/cities/:stateId", utilsController.getCitiesById);
router.get("/professions", utilsController.getAllProfessions);
router.get("/qualifications", utilsController.getAllQualifications);
router.get(
  "/education-specialization/:qualificationId",
  utilsController.getEducationSpecializationById
);
router.get("/latest-jobs", utilsController.getLatestJobs);
router.post("/contact-us", utilsController.submitContact);
router.get("/job/:id", utilsController.getJobById);

module.exports = router;
