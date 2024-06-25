const express = require("express");
const router = express.Router();

const adminController = require("../controllers/admin.controller");
const authMiddleware = require("../middlewares/auth.middleware");

router.post("/register", adminController.register);
router.post("/login", adminController.login);
router.get(
  "/users-count",
  authMiddleware("Admin"),
  adminController.getUsersCount
);
router.get(
  "/recruiters",
  authMiddleware("Admin"),
  adminController.getRecruiters
);
router.get(
  "/job-seekers",
  authMiddleware("Admin"),
  adminController.getJobSeekers
);
router.post("/add-csv", authMiddleware("Admin"), adminController.addFromCSV);
router.get(
  "/contact-queries",
  authMiddleware("Admin"),
  adminController.getContactQueries
);
router.get(
  "/self-employees",
  authMiddleware("Admin"),
  adminController.getSelfEmployees
);
router.get(
  "/matrimony-users",
  authMiddleware("Admin"),
  adminController.getMatrimonyUsers
);
router.delete(
  "/delete-recruiter/:id",
  authMiddleware("Admin"),
  adminController.deleteRecruiter
);
router.delete(
  "/delete-job-seeker/:id",
  authMiddleware("Admin"),
  adminController.deleteJobSeeker
);
router.delete(
  "/delete-contact-query/:id",
  authMiddleware("Admin"),
  adminController.deleteContactQuery
);
router.delete(
  "/delete-matrimony-user/:id",
  authMiddleware("Admin"),
  adminController.deleteMatrimonyUser
);
router.delete(
  "/delete-self-employee/:id",
  authMiddleware("Admin"),
  adminController.deleteSelfEmployed
);

module.exports = router;
