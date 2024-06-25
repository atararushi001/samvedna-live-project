const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const recruiter = require("../models/recruiter.model");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDirectory = path.join(
      __dirname,
      "../public/uploads/profilePictures"
    );
    if (!fs.existsSync(uploadDirectory)) {
      fs.mkdirSync(uploadDirectory, { recursive: true });
    }
    cb(null, uploadDirectory);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 5 },
});

const recruiterController = {
  getAll: (req, res) => {
    recruiter.getAll((err, result) => {
      if (err) {
        res.status(500).json({ message: "Internal server error" });
        return;
      }
      res.status(200).json(result);
    });
  },
  getAllJobs: (req, res) => {
    recruiter.getAllJobs(req.user.id, (err, result) => {
      if (err) {
        res.status(500).json({ message: "Internal server error" });
        return;
      }
      res.status(200).json(result);
    });
  },
  register: [
    upload.single("profilePicture"),
    (req, res) => {
      const {
        name,
        email,
        password,
        company,
        designation,
        contactNumber,
        city,
        state,
        country,
      } = req.body;

      const profilePicture = req.file ? req.file.filename : null;

      if (
        !name ||
        !email ||
        !password ||
        !company ||
        !designation ||
        !contactNumber ||
        !city ||
        !state ||
        !country
      ) {
        res.status(400).json({ message: "All fields are required" });
        return;
      }

      bcrypt.hash(password, 10, (err, hash) => {
        if (err) {
          res.status(500).json({ message: "Internal server error" });
          return;
        }

        const newRecruiter = {
          name,
          email,
          password: hash,
          company,
          designation,
          contactNumber,
          city,
          state,
          country,
          profilePicture,
        };

        recruiter.create(newRecruiter, (err, result) => {
          if (err) {
            res.status(500).json({ message: "Internal server error" });
            console.log("Database error", err);
            return;
          }

          res.status(201).json({ message: "Recruiter created successfully" });
        });
      });
    },
  ],
  update: [
    upload.single("profilePicture"),
    (req, res) => {
      const {
        name,
        email,
        password,
        company,
        designation,
        contactNumber,
        city,
        state,
        country,
      } = req.body;

      const recruiterId = req.user.id;

      const profilePicture = req.file ? req.file.filename : null;

      bcrypt.hash(password, 10, (err, hash) => {
        if (err) {
          res.status(500).json({ message: "Internal server error" });
          return;
        }

        const updatedRecruiter = {
          name,
          email,
          password: hash,
          company,
          designation,
          contactNumber,
          city,
          state,
          country,
          profilePicture,
        };

        recruiter.update(recruiterId, updatedRecruiter, (err, result) => {
          if (err) {
            res.status(500).json({ message: "Internal server error" });
            console.log(err);
            return;
          }

          res.status(200).json({ message: "Recruiter updated successfully" });
        });
      });
    },
  ],
  login: (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ message: "All fields are required" });
      return;
    }

    recruiter.getByEmail(email, (err, result) => {
      if (err) {
        res.status(500).json({ message: "Internal server error" });
        return;
      }

      if (result.length === 0) {
        res.status(401).json({ message: "Invalid email or password" });
        return;
      }

      const recruiter = result[0];

      bcrypt.compare(password, recruiter.password, (err, isMatch) => {
        if (err) {
          res.status(500).json({ message: "Internal server error" });
          return;
        }

        if (!isMatch) {
          res.status(401).json({ message: "Invalid email or password" });
          return;
        }

        const token = jwt.sign(
          { id: recruiter.recruiters_id, type: "Recruiter" },
          process.env.JWT_SECRET,
          {
            expiresIn: "1d",
          }
        );

        res.status(200).json({
          message: "Recruiter Login Successful!",
          user: { token, type: "Recruiter", id: recruiter.recruiters_id },
        });
      });
    });
  },
  postJob: (req, res) => {
    const {
      companyName,
      website,
      natureOfBusiness,
      country,
      state,
      city,
      fax,
      areaCode,
      landline,
      mobile,
      email,
      employerName,
      companyDescription,
      jobDesignation,
      industryCategory,
      jobTitle,
      jobType,
      dutyDescription,
      jobDuration,
      minimumEducation,
      minimumExperience,
      salaryMin,
      salaryMax,
      workplaceType,
      placeOfWork,
      ageLimit,
      womenEligible,
      workingHoursFrom,
      workingHoursTo,
      vacanciesRegular,
      vacanciesTemporary,
      resumesToBeSent,
      resumeEmail,
      resumeWebsite,
      interviewDetailsDate,
      interviewDetailsTime,
      interviewDetailsAptitudeTest,
      interviewDetailsTechnicalTest,
      interviewDetailsGroupDiscussion,
      interviewDetailsPersonalInterview,
      interviewDetailsTopics,
      interviewDetailsContactPerson,
      disabilityInfoType,
      disabilityInfoPercentage,
      disabilityInfoAidOrAppliance,
      ownVehiclePreferred,
      conveyanceProvided,
      conveyanceType,
      otherInformation,
    } = req.body;

    const currentDate = new Date();
    const recruiterId = req.user.id;

    const newJob = {
      recruiterId,
      companyName,
      website,
      natureOfBusiness,
      country,
      state,
      city,
      fax,
      areaCode,
      landline,
      mobile,
      email,
      employerName,
      companyDescription,
      jobDesignation,
      industryCategory,
      jobTitle,
      jobType,
      dutyDescription,
      jobDuration,
      minimumEducation,
      minimumExperience,
      salaryMin,
      salaryMax,
      workplaceType,
      placeOfWork,
      ageLimit,
      womenEligible,
      workingHoursFrom,
      workingHoursTo,
      vacanciesRegular,
      vacanciesTemporary,
      resumesToBeSent,
      resumeEmail,
      resumeWebsite,
      interviewDetailsDate,
      interviewDetailsTime,
      interviewDetailsAptitudeTest,
      interviewDetailsTechnicalTest,
      interviewDetailsGroupDiscussion,
      interviewDetailsPersonalInterview,
      interviewDetailsTopics,
      interviewDetailsContactPerson,
      disabilityInfoType,
      disabilityInfoPercentage,
      disabilityInfoAidOrAppliance,
      ownVehiclePreferred,
      conveyanceProvided,
      conveyanceType,
      otherInformation,
      currentDate,
    };

    recruiter.postJob(newJob, (err, result) => {
      if (err) {
        res.status(500).json({ message: "Internal server error" });
        return;
      }

      res.status(201).json({ message: "Job posted successfully" });
    });
  },
  updateJob: (req, res) => {
    const {
      companyName,
      website,
      natureOfBusiness,
      country,
      state,
      city,
      fax,
      areaCode,
      landline,
      mobile,
      email,
      employerName,
      companyDescription,
      jobDesignation,
      industryCategory,
      jobTitle,
      jobType,
      dutyDescription,
      jobDuration,
      minimumEducation,
      minimumExperience,
      salaryMin,
      salaryMax,
      workplaceType,
      placeOfWork,
      ageLimit,
      womenEligible,
      workingHoursFrom,
      workingHoursTo,
      vacanciesRegular,
      vacanciesTemporary,
      resumesToBeSent,
      resumeEmail,
      resumeWebsite,
      interviewDetailsDate,
      interviewDetailsTime,
      interviewDetailsAptitudeTest,
      interviewDetailsTechnicalTest,
      interviewDetailsGroupDiscussion,
      interviewDetailsPersonalInterview,
      interviewDetailsTopics,
      interviewDetailsContactPerson,
      disabilityInfoType,
      disabilityInfoPercentage,
      disabilityInfoAidOrAppliance,
      ownVehiclePreferred,
      conveyanceProvided,
      conveyanceType,
      otherInformation,
    } = req.body;

    const recruiterId = req.user.id;

    const updatedJob = {
      recruiterId,
      companyName,
      website,
      natureOfBusiness,
      country,
      state,
      city,
      fax,
      areaCode,
      landline,
      mobile,
      email,
      employerName,
      companyDescription,
      jobDesignation,
      industryCategory,
      jobTitle,
      jobType,
      dutyDescription,
      jobDuration,
      minimumEducation,
      minimumExperience,
      salaryMin,
      salaryMax,
      workplaceType,
      placeOfWork,
      ageLimit,
      womenEligible,
      workingHoursFrom,
      workingHoursTo,
      vacanciesRegular,
      vacanciesTemporary,
      resumesToBeSent,
      resumeEmail,
      resumeWebsite,
      interviewDetailsDate,
      interviewDetailsTime,
      interviewDetailsAptitudeTest,
      interviewDetailsTechnicalTest,
      interviewDetailsGroupDiscussion,
      interviewDetailsPersonalInterview,
      interviewDetailsTopics,
      interviewDetailsContactPerson,
      disabilityInfoType,
      disabilityInfoPercentage,
      disabilityInfoAidOrAppliance,
      ownVehiclePreferred,
      conveyanceProvided,
      conveyanceType,
      otherInformation,
    };

    recruiter.updateJob(req.params.id, updatedJob, (err, result) => {
      if (err) {
        res.status(500).json({ message: "Internal server error" });
        console.log(err);
        return;
      }

      res.status(200).json({ message: "Job updated successfully" });
    });
  },
  deleteJob: (req, res) => {
    recruiter.deleteJob(req.params.id, (err, result) => {
      if (err) {
        res.status(500).json({ message: "Internal server error" });
        return;
      }

      res.status(200).json({ message: "Job deleted successfully" });
    });
  },
  getJobById: (req, res) => {
    recruiter.getJobById(req.params.id, (err, result) => {
      if (err) {
        res.status(500).json({ message: "Internal server error" });
        return;
      }

      res.status(200).json(result);
    });
  },
  changeStatus: (req, res) => {
    recruiter.changeStatus(req.params.id, (err, result) => {
      if (err) {
        res.status(500).json({ message: "Internal server error" });
        return;
      }

      res.status(200).json({ message: "Job status changed successfully" });
    });
  },
  getAllResumes: (req, res) => {
    recruiter.getAllResumes((err, result) => {
      if (err) {
        res.status(500).json({ message: "Internal server error" });
        return;
      }

      res.status(200).json(result);
    });
  },
  getFullResume: (req, res) => {
    recruiter.getFullResume(req.params.id, (err, result) => {
      if (err) {
        res.status(500).json({ message: "Internal server error" });
        return;
      }

      res.status(200).json(result);
    });
  },
};

module.exports = recruiterController;
