const db = require("../config/db.config.js");
const db_name = process.env.MYSQL_DATABASE;

const Matrimony = {
  getAll: (callback) => {
    return db.query(`SELECT * FROM ${db_name}.matrimony`, callback);
  },
  create: (newUser, callback) => {
    const {
      profilePicture,
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
    } = newUser;

    db.query(
      `INSERT INTO ${db_name}.matrimony (firstName, lastName, email, password, phone, gender, dob, timeOfBirth, placeOfBirth, community, religion, caste, subCaste, motherTongue, country, state, city, address, pincode, maritalStatus, haveChildren, noOfChildren, height, weight, complexion, bodyType, bloodGroup, donateBlood, qualification, educationSpecialization, currentLocation, immigrationStatus, designation, designationDetails, annualIncome, fatherName, fatherOccupation, fatherMobile, motherName, motherOccupation, motherMobile, grandfatherName, grandmotherName, nanaName, naniName, noOfBrothers, noOfSisters, believeInHoroscope, rashi, gotra, varna, mangalShani, diet, smoke, drink, hobbies, ageGap, partnerReligion, partnerCaste, partnerSubCaste, partnerQualification, partnerOccupation, partnerAnnualIncome, mangalik, partnerMaritalStatus, goAbroad, disability, disabilityPercentage, about) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
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
      ],
      (err, results) => {
        if (err) {
          return callback(err);
        }

        const matrimonyId = results.insertId;
        const pictures = profilePicture.map((picture) => [
          matrimonyId,
          picture,
        ]);

        db.query(
          `INSERT INTO ${db_name}.matrimony_pictures (matrimony_id, profilePicture) VALUES ?`,
          [pictures],
          (err, results) => {
            if (err) {
              return callback(err);
            }

            return callback(null, results);
          }
        );
      }
    );
  },
  getByEmail: (email, callback) => {
    return db.query(
      `SELECT * FROM ${db_name}.matrimony WHERE email = ?`,
      [email],
      callback
    );
  },
  getById: (id, callback) => {
    return db.query(
      `SELECT * FROM ${db_name}.matrimony WHERE id = ?`,
      [id],
      callback
    );
  },
};

module.exports = Matrimony;
