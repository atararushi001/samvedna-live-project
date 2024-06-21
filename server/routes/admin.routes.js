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

module.exports = router;
