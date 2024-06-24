const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const selfEmployed = require("../models/selfEmployed.model");

const selfEmployedController = {
  getAll: (req, res) => {
    selfEmployed.getAll((err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal Server Error" });
      }
      res.status(200).json(results);
    });
  },
  create: (req, res) => {
    const {
      name,
      disabilityType,
      percentage,
      education,
      companyName,
      companyType,
      officeAddress,
      contactNumber,
      email,
      professionType,
      description,
      experience,
      assistanceNedeed,
      productDetails,
    } = req.body;

    if (
      !name ||
      !disabilityType ||
      !percentage ||
      !education ||
      !companyName ||
      !companyType ||
      !officeAddress ||
      !contactNumber ||
      !email ||
      !professionType ||
      !description ||
      !experience ||
      !assistanceNedeed ||
      productDetails.length === 0
    ) {
      console.log(req.body);
      return res.status(400).json({ message: "All fields are required" });
    }

    selfEmployed.create(
      {
        name,
        disabilityType,
        percentage,
        education,
        companyName,
        companyType,
        officeAddress,
        contactNumber,
        email,
        professionType,
        description,
        experience,
        assistanceNedeed,
        productDetails,
      },
      (err, result) => {
        if (err) {
          console.log(err);
          return res.status(500).json({ message: "Internal Server Error" });
        }
        res.status(201).json({ message: "Self-employed created successfully" });
      }
    );
  },
};

module.exports = selfEmployedController;
