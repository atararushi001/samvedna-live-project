const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const csv = require("csvtojson");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const moment = require("moment");

const Admin = require("../models/admin.model");
const JobSeeker = require("../models/jobSeeker.model");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: storage });

const adminController = {
  register: (req, res) => {
    const { username, password } = req.body;

    bcrypt.hash(password, 10, (err, hash) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ message: "An error occurred" });
      }

      Admin.register({ username, password: hash }, (err, result) => {
        if (err) {
          console.log(err);
          return res.status(500).json({ message: "An error occurred" });
        }

        res.json({ message: "Admin registered" });
      });
    });
  },
  login: (req, res) => {
    const { username, password } = req.body;

    Admin.login(username, (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ message: "An error occurred" });
      }

      if (!result.length) {
        return res
          .status(401)
          .json({ message: "Invalid username or password" });
      }

      const admin = result[0];

      bcrypt.compare(password, admin.password, (err, isMatch) => {
        if (err) {
          console.log(err);
          return res.status(500).json({ message: "An error occurred" });
        }

        if (!isMatch) {
          return res
            .status(401)
            .json({ message: "Invalid username or password" });
        }

        const token = jwt.sign(
          { id: admin.id, username: admin.username, type: "Admin" },
          process.env.JWT_SECRET,
          {
            expiresIn: "1d",
          }
        );

        res.status(200).json({
          user: {
            token,
            type: "Admin",
            id: admin.id,
            username: admin.username,
          },
          message: "Admin Login Successful!",
        });
      });
    });
  },
  getUsersCount: (req, res) => {
    Admin.getUsersCount((err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ message: "An error occurred" });
      } else {
        return res.json(result);
      }
    });
  },
  getRecruiters: (req, res) => {
    Admin.getRecruiters((err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ message: "An error occurred" });
      } else {
        return res.json(result);
      }
    });
  },
  getJobSeekers: (req, res) => {
    Admin.getJobSeekers((err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ message: "An error occurred" });
      } else {
        return res.json(result);
      }
    });
  },
  addFromCSV: [
    upload.single("csv"),
    async (req, res) => {
      const csvFilePath = req.file.path;

      try {
        const csvData = await csv().fromFile(csvFilePath);

        if (!csvData.length) {
          return res.status(400).json({ message: "CSV file is empty" });
        }

        // Use Promise.all to handle multiple rows
        const operations = csvData.map(
          (row) =>
            new Promise((resolve, reject) => {
              JobSeeker.getByEmail(row.email, async (err, result) => {
                if (err) {
                  console.log(err);
                  return reject("An error occurred");
                }

                if (result.length) {
                  // If job seeker exists, resolve without creating a new one
                  resolve(`Job Seeker with email ${row.email} already exists`);
                } else {
                  try {
                    // Hash password and create a new job seeker
                    const hashedPassword = await bcrypt.hash(row.password, 10);
                    row.password = hashedPassword;
                    JobSeeker.create(row, (err, result) => {
                      if (err) {
                        console.log("Database error", err);
                        return reject("Internal server error");
                      } else {
                        resolve("Job Seeker created successfully");
                      }
                    });
                  } catch (error) {
                    reject("Error hashing password");
                  }
                }
              });
            })
        );

        // Wait for all operations to complete
        Promise.all(operations)
          .then((results) => {
            fs.unlink(csvFilePath, (err) => {
              if (err) {
                console.error("Error deleting the CSV file:", err);
                // Even if there's an error deleting the file, respond with the operation results
              }
              res.status(201).json({ messages: results });
            });
          })
          .catch((error) => {
            res.status(500).json({ message: error });
          });
      } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Error parsing CSV data" });
      }
    },
  ],
  getContactQueries: (req, res) => {
    Admin.getContactQueries((err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ message: "An error occurred" });
      } else {
        return res.json(result);
      }
    });
  },
  getSelfEmployees: (req, res) => {
    Admin.getSelfEmployees((err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ message: "An error occurred" });
      } else {
        return res.json(result);
      }
    });
  },
  getMatrimonyUsers: (req, res) => {
    Admin.getMatrimonyUsers((err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ message: "An error occurred" });
      } else {
        return res.json(result);
      }
    });
  },
  deleteRecruiter: (req, res) => {
    const { id } = req.params;

    Admin.deleteRecruiter(id, (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ message: "An error occurred" });
      }

      res.json({ message: "Recruiter deleted" });
    });
  },
  deleteJobSeeker: (req, res) => {
    const { id } = req.params;

    Admin.deleteJobSeeker(id, (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ message: "An error occurred" });
      }

      res.json({ message: "Job Seeker deleted" });
    });
  },
  deleteContactQuery: (req, res) => {
    const { id } = req.params;

    Admin.deleteContactQuery(id, (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ message: "An error occurred" });
      }

      res.json({ message: "Contact Query deleted" });
    });
  },
  deleteSelfEmployed: (req, res) => {
    const { id } = req.params;

    Admin.deleteSelfEmployed(id, (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ message: "An error occurred" });
      }

      res.json({ message: "Self Employed deleted" });
    });
  },
  deleteMatrimonyUser: (req, res) => {
    const { id } = req.params;

    Admin.deleteMatrimonyUser(id, (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ message: "An error occurred" });
      }

      res.json({ message: "Matrimony User deleted" });
    });
  },
  updateJobSeeker: (req, res) => {
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

    if (password) {
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
          dob: moment(dob).format("YYYY-MM-DD HH:mm:ss"),
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

        Admin.updateJobSeeker(req.params.id, newJobSeeker, (err, result) => {
          if (err) {
            res.status(500).json({ message: "Internal server error" });
            console.log(err);
            return;
          }

          res.status(200).json({ message: "Job Seeker updated successfully" });
        });
      });
    } else {
      const newJobSeeker = {
        email,
        username,
        name,
        lastName,
        dob: moment(dob).format("YYYY-MM-DD HH:mm:ss"),
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

      console.log(req.body);

      Admin.updateJobSeeker(req.params.id, newJobSeeker, (err, result) => {
        if (err) {
          res.status(500).json({ message: "Internal server error" });
          console.log(err);
          return;
        }

        res.status(200).json({ message: "Job Seeker updated successfully" });
      });
    }
  },
  updateMatrimonyUser: (req, res) => {
    const {
      firstName,
      lastName,
      email,
      password,
      phone,
      gender,
      dob,
      timeOfBirth,
      placeOfBirth,
      community,
      religion,
      caste,
      subCaste,
      motherTongue,
      country,
      state,
      city,
      address,
      pincode,
      maritalStatus,
      haveChildren,
      noOfChildren,
      height,
      weight,
      complexion,
      bodyType,
      bloodGroup,
      donateBlood,
      qualification,
      educationSpecialization,
      currentLocation,
      immigrationStatus,
      designation,
      designationDetails,
      annualIncome,
      fatherName,
      fatherOccupation,
      fatherMobile,
      motherName,
      motherOccupation,
      motherMobile,
      grandfatherName,
      grandmotherName,
      nanaName,
      naniName,
      noOfBrothers,
      noOfSisters,
      believeInHoroscope,
      rashi,
      gotra,
      varna,
      mangalShani,
      diet,
      smoke,
      drink,
      hobbies,
      ageGap,
      partnerReligion,
      partnerCaste,
      partnerSubCaste,
      partnerQualification,
      partnerOccupation,
      partnerAnnualIncome,
      mangalik,
      partnerMaritalStatus,
      goAbroad,
      disability,
      disabilityPercentage,
      about,
    } = req.body;

    if (password) {
      bcrypt.hash(password, 10, (err, hash) => {
        if (err) {
          res.status(500).json({ message: "Internal server error" });
          return;
        }

        const matrimonyUser = {
          firstName,
          lastName,
          email,
          password: hash,
          phone,
          gender,
          dob: moment(dob).format("YYYY-MM-DD HH:mm:ss"),
          timeOfBirth,
          placeOfBirth,
          community,
          religion,
          caste,
          subCaste,
          motherTongue,
          country,
          state,
          city,
          address,
          pincode,
          maritalStatus,
          haveChildren,
          noOfChildren,
          height,
          weight,
          complexion,
          bodyType,
          bloodGroup,
          donateBlood,
          qualification,
          educationSpecialization,
          currentLocation,
          immigrationStatus,
          designation,
          designationDetails,
          annualIncome,
          fatherName,
          fatherOccupation,
          fatherMobile,
          motherName,
          motherOccupation,
          motherMobile,
          grandfatherName,
          grandmotherName,
          nanaName,
          naniName,
          noOfBrothers,
          noOfSisters,
          believeInHoroscope,
          rashi,
          gotra,
          varna,
          mangalShani,
          diet,
          smoke,
          drink,
          hobbies,
          ageGap,
          partnerReligion,
          partnerCaste,
          partnerSubCaste,
          partnerQualification,
          partnerOccupation,
          partnerAnnualIncome,
          mangalik,
          partnerMaritalStatus,
          goAbroad,
          disability,
          disabilityPercentage,
          about,
        };

        Admin.updateMatrimonyUser(req.params.id, matrimonyUser, (err, result) => {
          if (err) {
            res.status(500).json({ message: "Internal server error" });
            console.log(err);
            return;
          }

          res.status(200).json({ message: "User updated successfully" });
        });
      });
    } else {
      const matrimonyUser = {
        firstName,
        lastName,
        email,
        phone,
        gender,
        dob: moment(dob).format("YYYY-MM-DD HH:mm:ss"),
        timeOfBirth,
        placeOfBirth,
        community,
        religion,
        caste,
        subCaste,
        motherTongue,
        country,
        state,
        city,
        address,
        pincode,
        maritalStatus,
        haveChildren,
        noOfChildren,
        height,
        weight,
        complexion,
        bodyType,
        bloodGroup,
        donateBlood,
        qualification,
        educationSpecialization,
        currentLocation,
        immigrationStatus,
        designation,
        designationDetails,
        annualIncome,
        fatherName,
        fatherOccupation,
        fatherMobile,
        motherName,
        motherOccupation,
        motherMobile,
        grandfatherName,
        grandmotherName,
        nanaName,
        naniName,
        noOfBrothers,
        noOfSisters,
        believeInHoroscope,
        rashi,
        gotra,
        varna,
        mangalShani,
        diet,
        smoke,
        drink,
        hobbies,
        ageGap,
        partnerReligion,
        partnerCaste,
        partnerSubCaste,
        partnerQualification,
        partnerOccupation,
        partnerAnnualIncome,
        mangalik,
        partnerMaritalStatus,
        goAbroad,
        disability,
        disabilityPercentage,
        about,
      };

      Admin.updateMatrimonyUser(req.params.id, matrimonyUser, (err, result) => {
        if (err) {
          res.status(500).json({ message: "Internal server error" });
          console.log(err);
          return;
        }

        res.status(200).json({ message: "User updated successfully" });
      });
    }
  }
};

module.exports = adminController;
