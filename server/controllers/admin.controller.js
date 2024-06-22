const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const csv = require("csvtojson");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

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

        JobSeeker.getByEmail(csvData[0].email, (err, result) => {
          if (err) {
            console.log(err);
            return res.status(500).json({ message: "An error occurred" });
          }

          if (result.length) {
            fs.unlink(csvFilePath, (err) => {
              if (err) {
                console.error("Error deleting the CSV file:", err);
                return;
              }
            });
            return res.status(400).json({
              message: `Job Seeker with email ${csvData[0].email} already exists`,
            });
          } else {
            bcrypt.hash(csvData[0].password, 10, (err, hash) => {
              if (err) {
                res.status(500).json({ message: "Internal server error" });
                return;
              }

              csvData[0].password = hash;

              JobSeeker.create(csvData[0], (err, result) => {
                if (err) {
                  res.status(500).json({ message: "Internal server error" });
                  console.log("Database error", err);
                  return;
                } else {
                  fs.unlink(csvFilePath, (err) => {
                    if (err) {
                      console.error("Error deleting the CSV file:", err);
                      return;
                    }
                  });

                  return res
                    .status(201)
                    .json({ message: "Job Seeker created successfully" });
                }
              });
            });
          }
        });
      } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Error parsing CSV data" });
      }
    },
  ],
};

module.exports = adminController;
