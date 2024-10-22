const express = require("express");
const router = express.Router();

const recruiterController = require("../controllers/recruiter.controller");
const authMiddlware = require("../middlewares/auth.middleware");

router.get("/", recruiterController.getAll);
router.get("/jobs", authMiddlware("Recruiter"), recruiterController.getAllJobs);
router.post("/register", recruiterController.register);
router.post("/login", recruiterController.login);
router.put("/update/:id", authMiddlware("Admin"), recruiterController.update);
router.post(
  "/post-job",
  authMiddlware("Recruiter"),
  recruiterController.postJob
);
router.put(
  "/update-job/:id",
  authMiddlware("Recruiter"),
  recruiterController.updateJob
);
router.delete(
  "/delete-job/:id",
  authMiddlware("Recruiter"),
  recruiterController.deleteJob
);
router.get(
  "/job/:id",
  authMiddlware("Recruiter"),
  recruiterController.getJobById
);
router.put(
  "/change-status/:id",
  authMiddlware("Recruiter"),
  recruiterController.changeStatus
);
router.get(
  "/resumes",
  authMiddlware("Recruiter"),
  recruiterController.getAllResumes
);
router.get(
  "/get-resume/:id",
  authMiddlware("Recruiter"),
  recruiterController.getFullResume
);
router.get(
  '/get-jobseekers/:search',
  authMiddlware("Recruiter"),
  recruiterController.searchJobSeeker
)

module.exports = router;
