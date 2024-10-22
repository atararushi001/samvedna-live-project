const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const jobSeeker = require("../models/jobSeeker.model");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const moment = require("moment");
// Set up storage for photo uploads

// Set up storage for photo uploads
const storagePhoto = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDirectory = path.join(
      __dirname,
      "../public/uploads/job/profile"
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

// Set up storage for resume uploads
const storageResume = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDirectory = path.join(
      __dirname,
      "../public/uploads/job/resume"
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
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      const uploadDirectory = path.join(__dirname, "../public/uploads/job");
      if (!fs.existsSync(uploadDirectory)) {
        fs.mkdirSync(uploadDirectory, { recursive: true });
      }
      cb(null, uploadDirectory);
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + path.extname(file.originalname));
    },
  }),
}).fields([
  { name: "photo", maxCount: 1 },
  { name: "resume", maxCount: 1 },
]);

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
    const id = req.user.id; // Extract user ID from authMiddleware
    jobSeeker.getById(id, (err, results) => {
      console.log(results);
      if (err) {
        return res.status(500).json({ message: "Internal server error" });
      }
      // if (!results.length) {
      //   return res.status(404).json({ message: 'Job Seeker not found' });
      // }
      res.status(200).json({ jobSeeker: results });
    });
  },

  // register: [
  //   // Middleware to handle file uploads
  //   // uploadPhoto.single("photo"),
  //   // uploadResume.single("resume"),
  //   upload,
  //   (req, res) => {
  //     // console.log(req.body.education);
  //     const {
  //       email,
  //       username,
  //       password,
  //       confirmPassword,
  //       FirstName,
  //       FatherName,
  //       Surname,
  //       lastName,
  //       artSkills,
  //       employmentGapReason,
  //       employmentGapDuration,
  //       languageProficiency,
  //       hobbiesOrInterests,
  //       professionalMemberships,
  //       careerObjective,
  //       otherRelevantInfo,
  //       notableAchievements,
  //       jobCategories,
  //       preferredLocation,
  //       jobType,
  //       accommodationsNeeded,
  //       transportationNeeded,
  //       specificNeed,
  //       softwareRequirements,
  //       specificEquipment,
  //       dob,
  //       gender,
  //       permanentAddress,
  //       currentAddress,
  //       city,
  //       state,
  //       postalCode,
  //       country,
  //       contactNumber,
  //       whatsappNumber,
  //       AadharCardNumber,
  //       LinkedInID,
  //       jobAlerts,
  //       homePhone,
  //       addHomePhone,
  //       qualification,
  //       educationSpecialization,
  //       typeOfDisability,
  //       transportationMobility,
  //       specificDisability,
  //       levelOfDisability,
  //       assistiveTechnology,
  //       experienceAndAppliance,
  //       yesNoQuestion,
  //       twoWheeler,
  //       threeWheeler,
  //       car,
  //       disabilityPercentage,
  //       specializationInDisability,
  //       education,
  //       Experience,
  //       professionalReferences,
  //     } = req.body;

  //     const photo = req.files && req.files.photo ? req.files.photo[0].filename : null;
  //     const resume = req.files && req.files.resume ? req.files.resume[0].filename : null;

  //     // console.log('photo:', photo);
  //     // console.log('resume:', resume);

  //     if (password) {
  //       bcrypt.hash(password, 10, (err, hash) => {
  //         if (err) {
  //           res.status(500).json({ message: "Internal server error" });
  //           return;
  //         }

  //       const newJobSeeker = {
  //         email,
  //         username,
  //         password,
  //         confirmPassword,
  //         FirstName,
  //         FatherName,
  //         Surname,
  //         lastName,
  //         artSkills,
  //         employmentGapReason,
  //         employmentGapDuration,
  //         languageProficiency,
  //         hobbiesOrInterests,
  //         professionalMemberships,
  //         careerObjective,
  //         otherRelevantInfo,
  //         notableAchievements,
  //         jobCategories,
  //         preferredLocation,
  //         jobType,
  //         accommodationsNeeded,
  //         transportationNeeded,
  //         specificNeed,
  //         softwareRequirements,
  //         specificEquipment,
  //         photo,
  //         resume,
  //         dob,
  //         gender,
  //         permanentAddress,
  //         currentAddress,
  //         city,
  //         state,
  //         postalCode,
  //         country,
  //         contactNumber,
  //         whatsappNumber,
  //         AadharCardNumber,
  //         LinkedInID,
  //         jobAlerts,
  //         homePhone,
  //         addHomePhone,
  //         qualification,
  //         educationSpecialization,
  //         typeOfDisability,
  //         transportationMobility,
  //         specificDisability,
  //         levelOfDisability,
  //         assistiveTechnology,
  //         experienceAndAppliance,
  //         yesNoQuestion,
  //         twoWheeler,
  //         threeWheeler,
  //         car,
  //         disabilityPercentage,
  //         specializationInDisability,
  //         education,
  //         Experience,
  //         professionalReferences,
  //       };

  //       jobSeeker.create(newJobSeeker, (err, result) => {
  //         // console.log(err);
  //         if (err) {
  //           console.error("Database error", err); // Enhanced logging
  //           res
  //             .status(500)
  //             .json({ message: "Internal server error", error: err });
  //           return;
  //         } else {
  //           return res
  //             .status(201)
  //             .json({ message: "Job Seeker created successfully" });
  //         }
  //       });
  //     });
  //   }
  // }
  // ],

  register: [
    // Middleware to handle file uploads
    // uploadPhoto.single("photo"),
    // uploadResume.single("resume"),
    upload,
    (req, res) => {
      // console.log(req.body.education);
      const {
        email,

        password,
        confirmPassword,
      } = req.body;

      // const photo = req.files && req.files.photo ? req.files.photo[0].filename : null;
      // const resume = req.files && req.files.resume ? req.files.resume[0].filename : null;

      // console.log('photo:', photo);
      // console.log('resume:', resume);

      if (password) {
        bcrypt.hash(password, 10, (err, hash) => {
          if (err) {
            res.status(500).json({ message: "Internal server error" });
            return;
          }

          const newJobSeeker = {
            email,

            password,
          };
          newJobSeeker.password = hash;
          jobSeeker.create(newJobSeeker, (err, result) => {
            // console.log(err);
            if (err) {
              console.error("Database error", err); // Enhanced logging
              res
                .status(500)
                .json({ message: "Internal server error", error: err });
              return;
            } else {
              return res
                .status(201)
                .json({ message: "Job Seeker created successfully" });
            }
          });
        });
      }
    },
  ],

  login: (req, res) => {
    const { email, password } = req.body;

    jobSeeker.getByEmail(email, (err, result) => {
      if (err) {
        res.status(500).json({ message: "Internal server error" });
        console.log("Database error", err);
        return;
      }
      // console.log( password);
      if (!result.length) {
        // console.log(result);
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
  update: [
    // Middleware to handle file uploads
    upload,
    (req, res) => {
      const {
        email,
        username,
        password,
        confirmPassword,
        FirstName,
        FatherName,
        Surname,
        lastName,
        artSkills,
        employmentGapReason,
        employmentGapDuration,
        languageProficiency,
        hobbiesOrInterests,
        professionalMemberships,
        careerObjective,
        otherRelevantInfo,
        notableAchievements,
        jobCategories,
        preferredLocation,
        jobType,
        accommodationsNeeded,
        transportationNeeded,
        specificNeed,
        softwareRequirements,
        specificEquipment,
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
        AadharCardNumber,
        LinkedInID,
        jobAlerts,
        homePhone,
        addHomePhone,
        qualification,
        educationSpecialization,
        typeOfDisability,
        transportationMobility,
        specificDisability,
        levelOfDisability,
        assistiveTechnology,
        experienceAndAppliance,
        yesNoQuestion,
        twoWheeler,
        threeWheeler,
        car,
        disabilityPercentage,
        specializationInDisability,
        education,
        Experience,
        professionalReferences,
      } = req.body;

      const photo =
        req.files && req.files.photo ? req.files.photo[0].filename : null;
      const resume =
        req.files && req.files.resume ? req.files.resume[0].filename : null;

      const updatedJobSeeker = {
        email,
        username,
        password,
        confirmPassword,
        FirstName,
        FatherName,
        Surname,
        lastName,
        artSkills,
        employmentGapReason,
        employmentGapDuration,
        languageProficiency,
        hobbiesOrInterests,
        professionalMemberships,
        careerObjective,
        otherRelevantInfo,
        notableAchievements,
        jobCategories,
        preferredLocation,
        jobType,
        accommodationsNeeded,
        transportationNeeded,
        specificNeed,
        softwareRequirements,
        specificEquipment,
        photo,
        resume,
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
        AadharCardNumber,
        LinkedInID,
        jobAlerts,
        homePhone,
        addHomePhone,
        qualification,
        educationSpecialization,
        typeOfDisability,
        transportationMobility,
        specificDisability,
        levelOfDisability,
        assistiveTechnology,
        experienceAndAppliance,
        yesNoQuestion,
        twoWheeler,
        threeWheeler,
        car,
        disabilityPercentage,
        specializationInDisability,
        education,
        Experience,
        professionalReferences,
      };

      if (password) {
        bcrypt.hash(password, 10, (err, hash) => {
          if (err) {
            res.status(500).json({ message: "Internal server error" });
            return;
          }

          updatedJobSeeker.password = hash;

          jobSeeker.update(req.params.id, updatedJobSeeker, (err, result) => {
            if (err) {
              console.error("Database error", err); // Enhanced logging
              res
                .status(500)
                .json({ message: "Internal server error", error: err });
              return;
            } else {
              return res
                .status(200)
                .json({ message: "Job Seeker updated successfully" });
            }
          });
        });
      } else {
        jobSeeker.update(req.params.id, updatedJobSeeker, (err, result) => {
          if (err) {
            console.error("Database error", err); // Enhanced logging
            res
              .status(500)
              .json({ message: "Internal server error", error: err });
            return;
          } else {
            return res
              .status(200)
              .json({ message: "Job Seeker updated successfully" });
          }
        });
      }
    },
  ],
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
