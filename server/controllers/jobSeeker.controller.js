const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const jobSeeker = require("../models/jobSeeker.model");

const jobSeekerController = {
  getAll: (req, res) => {
    jobSeeker.getAll((err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal server error" });
      }
      res.status(200).json(results);
    });
  },
  getById: (req, res) => {
    const id = req.user.id;
    jobSeeker.getById(id, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal server error" });
      }
      if (!results.length) {
        return res.status(404).json("Job Seeker not found");
      }
      res.status(200).json({ jobSeeker: results[0] });
    });
  },
  register: (req, res) => {
    const {
      email,
      username,
      password,
      name,
      lastName,
      dob,
      gender,
      permanentAddress,
      currentAddress,
      city,
      state,
      postalCode,
      country,
      contactNumber,
      whatsappNumber,
      jobAlerts,
      homePhone,
      addHomePhone,
      qualification,
      educationSpecialization,
      experienceAndAppliance,
      yesNoQuestion,
      twoWheeler,
      threeWheeler,
      car,
      disabilityPercentage,
      specializationInDisability,
    } = req.body;

    bcrypt.hash(password, 10, (err, hash) => {
      if (err) {
        res.status(500).json({ message: "Internal server error" });
        return;
      }

      const newJobSeeker = {
        email,
        username,
        password: hash,
        name,
        lastName,
        dob,
        gender,
        permanentAddress,
        currentAddress,
        city,
        state,
        postalCode,
        country,
        contactNumber,
        whatsappNumber,
        jobAlerts,
        homePhone,
        addHomePhone,
        qualification,
        educationSpecialization,
        experienceAndAppliance,
        yesNoQuestion,
        twoWheeler,
        threeWheeler,
        car,
        disabilityPercentage,
        specializationInDisability,
      };

      jobSeeker.create(newJobSeeker, (err, result) => {
        if (err) {
          res.status(500).json({ message: "Internal server error" });
          console.log("Database error", err);
          return;
        }

        res.status(201).json({ message: "Job Seeker created successfully" });
      });
    });
  },
  login: (req, res) => {
    const { email, password } = req.body;

    jobSeeker.getByEmail(email, (err, result) => {
      if (err) {
        res.status(500).json({ message: "Internal server error" });
        console.log("Database error", err);
        return;
      }

      if (!result.length) {
        res.status(401).json({ message: "Invalid email or password" });
        return;
      }

      bcrypt.compare(password, result[0].password, (err, isMatch) => {
        if (err) {
          res.status(500).json({ message: "Internal server error" });
          console.log("bcrypt error", err);
          return;
        }

        if (!isMatch) {
          res.status(401).json({ message: "Invalid email or password" });
          return;
        }

        const token = jwt.sign(
          { id: result[0].job_seeker_id, type: "Job Seeker" },
          process.env.JWT_SECRET,
          {
            expiresIn: "1d",
          }
        );

        res.status(200).json({
          message: "Job Seeker Login Successful!",
          user: { token, type: "Job Seeker", id: result[0].job_seeker_id },
        });
      });
    });
  },
  update: (req, res) => {
    const {
      email,
      username,
      password,
      name,
      lastName,
      dob,
      gender,
      permanentAddress,
      currentAddress,
      city,
      state,
      postalCode,
      country,
      contactNumber,
      whatsappNumber,
      jobAlerts,
      homePhone,
      addHomePhone,
      qualification,
      educationSpecialization,
      experienceAndAppliance,
      yesNoQuestion,
      twoWheeler,
      threeWheeler,
      car,
      disabilityPercentage,
      specializationInDisability,
    } = req.body;

    bcrypt.hash(password, 10, (err, hash) => {
      if (err) {
        res.status(500).json({ message: "Internal server error" });
        return;
      }

      const newJobSeeker = {
        email,
        username,
        password: hash,
        name,
        lastName,
        dob,
        gender,
        permanentAddress,
        currentAddress,
        city,
        state,
        postalCode,
        country,
        contactNumber,
        whatsappNumber,
        jobAlerts,
        homePhone,
        addHomePhone,
        qualification,
        educationSpecialization,
        experienceAndAppliance,
        yesNoQuestion,
        twoWheeler,
        threeWheeler,
        car,
        disabilityPercentage,
        specializationInDisability,
      };

      jobSeeker.update(req.user.id, newJobSeeker, (err, result) => {
        if (err) {
          res.status(500).json({ message: "Internal server error" });
          console.log(err);
          return;
        }

        res.status(200).json({ message: "Job Seeker updated successfully" });
      });
    });
  },
  getCompanyDirectory: (req, res) => {
    jobSeeker.getCompanyDirectory((err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal server error" });
      }
      res.status(200).json(results);
    });
  },
  getAllUserResumes: (req, res) => {
    const jobSeekerId = req.user.id;
    jobSeeker.getAllUserResumes(jobSeekerId, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal server error" });
      }
      res.status(200).json(results);
    });
  },
  getFullResume: (req, res) => {
    const resumeId = req.params.id;
    jobSeeker.getFullResume(resumeId, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal server error" });
      }
      if (!results) {
        return res.status(404).json("Resume not found");
      }
      res.status(200).json(results);
    });
  },
  createResume: (req, res) => {
    const {
      resumeName,
      firstName,
      lastName,
      suffix,
      email,
      phone,
      website,
      linkedin,
      country,
      state,
      city,
      postalCode,
      summary,
      objective,
      militaryStatus,
      militaryAdditionalInfo,
      desiredPay,
      desiredCurrency,
      desiredPaytime,
      additionalPreferences,
      published,
      desiredJobType,
      employers,
      education,
      branches,
    } = req.body;

    const jobSeekerId = req.user.id;

    const newResume = {
      jobSeekerId,
      resumeName,
      firstName,
      lastName,
      suffix,
      email,
      phone,
      website,
      linkedin,
      country,
      state,
      city,
      postalCode,
      summary,
      objective,
      militaryStatus,
      militaryAdditionalInfo,
      desiredPay,
      desiredCurrency,
      desiredPaytime,
      additionalPreferences,
      published,
      desiredJobType,
      employers,
      education,
      branches,
    };

    jobSeeker.createResume(newResume, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal server error" });
      }
      res.status(201).json({ message: "Resume created successfully" });
    });
  },
  updateResume: (req, res) => {
    const resumeId = req.params.id;

    jobSeeker.getResumeById(resumeId, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal server error" });
      }
      if (!results.length) {
        return res.status(404).json({ message: "Resume not found" });
      }

      const {
        resumeName,
        firstName,
        lastName,
        suffix,
        email,
        phone,
        website,
        linkedin,
        country,
        state,
        city,
        postalCode,
        published,
        summary,
        objective,
        militaryStatus,
        militaryAdditionalInfo,
        desiredPay,
        desiredCurrency,
        desiredPaytime,
        additionalPreferences,
        desiredJobType,
        employers,
        education,
        branches,
      } = req.body;

      const newResume = {
        resumeName,
        firstName,
        lastName,
        suffix,
        email,
        phone,
        website,
        linkedin,
        country,
        state,
        city,
        postalCode,
        summary,
        objective,
        published,
        militaryStatus,
        militaryAdditionalInfo,
        desiredPay,
        desiredCurrency,
        desiredPaytime,
        additionalPreferences,
        desiredJobType,
        employers,
        education,
        branches,
      };

      jobSeeker.updateResume(resumeId, newResume, (err, results) => {
        if (err) {
          console.log(err);
          return res.status(500).json({ message: "Internal server error" });
        }
        res.status(200).json({ message: "Resume updated successfully" });
      });
    });
  },
  deleteResume: (req, res) => {
    const id = req.params.id;

    jobSeeker.getResumeById(id, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal server error" });
      }
      if (!results.length) {
        return res.status(404).json({ message: "Resume not found" });
      }

      jobSeeker.deleteResume(id, (err, results) => {
        if (err) {
          console.log(err);
          return res.status(500).json({ message: "Internal server error" });
        }
        res.status(200).json({ message: "Resume deleted successfully" });
      });
    });
  },
  getJobs: (req, res) => {
    const {
      search,
      status,
      postedBetweenStart,
      postedBetweenEnd,
      country,
      state,
    } = req.body;

    const searchJob = {
      search,
      status,
      postedBetweenStart,
      postedBetweenEnd,
      country,
      state,
    };

    jobSeeker.getJobs(searchJob, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal server error" });
      }
      res.status(200).json(results);
    });
  },
};

module.exports = jobSeekerController;
