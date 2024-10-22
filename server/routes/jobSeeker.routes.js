const express = require("express");
const router = express.Router();

const jobSeekerController = require("../controllers/jobSeeker.controller");
const authMiddleware = require("../middlewares/auth.middleware");

// router.post("/register", jobSeekerController.register);
router.post(
  "/register",
  // console.log("Register route called");
  // console.log(req.body);
  jobSeekerController.register
);
router.post("/login", jobSeekerController.login);
router.put(
  "/update/:id",
  authMiddleware("Job Seeker"),
  jobSeekerController.update
);
router.get(
  "/company-directory",
  authMiddleware("Job Seeker"),
  jobSeekerController.getCompanyDirectory
);
router.post(
  "/create-resume",
  authMiddleware("Job Seeker"),
  jobSeekerController.createResume
);
router.put(
  "/update-resume/:id",
  authMiddleware("Job Seeker"),
  jobSeekerController.updateResume
);
router.delete(
  "/delete-resume/:id",
  authMiddleware("Job Seeker"),
  jobSeekerController.deleteResume
);
router.get(
  "/get-resumes",
  authMiddleware("Job Seeker"),
  jobSeekerController.getAllUserResumes
);
router.get(
  "/get-resume/:id",
  authMiddleware("Job Seeker"),
  jobSeekerController.getFullResume
);
router.get("/", jobSeekerController.getAll);
router.get("/by-id", authMiddleware("Job Seeker"), jobSeekerController.getById);
router.post(
  "/search-jobs",
  authMiddleware("Job Seeker"),
  jobSeekerController.getJobs
);

module.exports = router;
