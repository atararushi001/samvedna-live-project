const express = require("express");
const router = express.Router();

const recruiterRouter = require("./recruiter.routes");
const jobSeekerRouter = require("./jobSeeker.routes");
const selfEmployedRouter = require("./selfEmployed.routes");
const utilsRouter = require("./utils.routes");
const blogRouter = require("./blog.routes");
const matrimonyRouter = require("./matrimony.routes");
const requestRouter = require("./request.routes");

router.use("/recruiter", recruiterRouter);
router.use("/job-seeker", jobSeekerRouter);
router.use("/self-employed", selfEmployedRouter);
router.use("/utils", utilsRouter);
router.use("/blogs", blogRouter);
router.use("/matrimony", matrimonyRouter);
router.use("/request", requestRouter);

router.use("/", (req, res) => {
  res.status(200).json({ message: "Welcome to the API" });
});

module.exports = router;
