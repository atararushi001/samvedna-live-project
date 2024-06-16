const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDirectory = path.join(
      __dirname,
      "../public/uploads/matrimonyPictures"
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

const matrimony = require("../models/matrimony.model.js");

const matrimonyController = {
  getAll: (req, res) => {
    matrimony.getAll((err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).send("Internal Server Error");
      }
      res.status(200).send(results);
    });
  },
  register: [
    upload.array("profilePicture", 3),
    (req, res) => {
      const {
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
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

      const profilePicture = req.files.map((file) => file.filename);

      if (password !== confirmPassword) {
        return res.status(400).send("Passwords do not match");
      }

      bcrypt.hash(password, 10, (err, hash) => {
        if (err) {
          console.log(err);
          return res.status(500).send("Internal Server Error");
        }

        const newUser = {
          profilePicture,
          firstName,
          lastName,
          email,
          password: hash,
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
        };

        matrimony.getByEmail(email, (err, results) => {
          if (err) {
            console.log(err);
            return res.status(500).send("Internal Server Error");
          }

          if (results.length > 0) {
            return res.status(400).send("User already exists");
          } else {
            matrimony.create(newUser, (err, results) => {
              if (err) {
                console.log(err);
                return res.status(500).send("Internal Server Error");
              }
              res.status(200).send({ message: "User registered successfully" });
            });
          }
        });
      });
    },
  ],
  login: (req, res) => {
    const { email, password } = req.body;

    matrimony.getByEmail(email, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).send("Internal Server Error");
      }

      if (results.length === 0) {
        return res.status(400).send("User does not exist");
      }

      bcrypt.compare(password, results[0].password, (err, isMatch) => {
        if (err) {
          console.log(err);
          return res.status(500).send("Internal Server Error");
        }

        if (!isMatch) {
          return res.status(400).send("Incorrect password");
        }

        const token = jwt.sign(
          { id: results[0].id, type: "Matrimony" },
          process.env.JWT_SECRET,
          {
            expiresIn: "1d",
          }
        );

        res.status(200).send({
          user: { token, type: "Matrimony", id: results[0].id },
          message: "Matrimony Login Successful!",
        });
      });
    });
  },
};

module.exports = matrimonyController;
