const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const selfEmployed = require("../models/selfEmployed.model");

const selfEmployedController = {
  getAll: (req, res) => {
    selfEmployed.getAll((err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).send("Internal Server Error");
      }
      res.status(200).send(results);
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
      product,
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
      product.length === 0
    ) {
      console.log(req.body);
      return res.status(400).send({ message: "All fields are required" });
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
        product,
      },
      (err, result) => {
        if (err) {
          console.log(err);
          return res.status(500).send({ message: "Internal Server Error" });
        }
        res.status(201).send({ message: "Self-employed created successfully" });
      }
    );
  },
};

module.exports = selfEmployedController;
