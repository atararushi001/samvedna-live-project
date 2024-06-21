const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const Admin = require("../models/admin.model");

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
};

module.exports = adminController;
