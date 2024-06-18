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
      `SELECT 
          m.*, 
          (SELECT GROUP_CONCAT(mp.profilePicture) FROM matrimony_pictures mp WHERE mp.matrimony_id = m.id) as profilePictures,
          c.name as countryName,
          s.name as stateName,
          ci.name as cityName,
          ql.qualification_name as qualificationName,
          es.education_specialization_name as educationSpecializationName,
          cl.name as currentLocationName,
          ql2.qualification_name as partnerQualificationName
          FROM 
              matrimony m
          INNER JOIN 
              country c ON m.country = c.id
          INNER JOIN 
              states s ON m.state = s.id
          INNER JOIN 
              cities ci ON m.city = ci.id
          INNER JOIN 
              qualificationlevel ql ON m.qualification = ql.qualification_id
          INNER JOIN 
              educationspecialization es ON m.educationSpecialization = es.education_specialization_id
          INNER JOIN 
              country cl ON m.currentLocation = cl.id
          INNER JOIN 
              qualificationlevel ql2 ON m.partnerQualification = ql2.qualification_id
          WHERE 
              m.id=?
          GROUP BY 
              m.id;`,
      [id],
      callback
    );
  },
  getUsers: (id, gender, callback) => {
    db.query(
      `SELECT 
          m.*, 
          (SELECT GROUP_CONCAT(mp.profilePicture) FROM matrimony_pictures mp WHERE mp.matrimony_id = m.id) as profilePictures,
          c.name as countryName,
          s.name as stateName,
          ci.name as cityName,
          ql.qualification_name as qualificationName,
          es.education_specialization_name as educationSpecializationName,
          cl.name as currentLocationName,
          ql2.qualification_name as partnerQualificationName
          FROM 
              matrimony m
          INNER JOIN 
              country c ON m.country = c.id
          INNER JOIN 
              states s ON m.state = s.id
          INNER JOIN 
              cities ci ON m.city = ci.id
          INNER JOIN 
              qualificationlevel ql ON m.qualification = ql.qualification_id
          INNER JOIN 
              educationspecialization es ON m.educationSpecialization = es.education_specialization_id
          INNER JOIN 
              country cl ON m.currentLocation = cl.id
          INNER JOIN 
              qualificationlevel ql2 ON m.partnerQualification = ql2.qualification_id
          WHERE 
              m.id!=? AND m.gender!=?
          GROUP BY 
              m.id;`,
      [id, gender],
      (error, results) => {
        if (error) {
          callback(error);
        }
        callback(null, results);
      }
    );
  },
  update: (id, user, callback) => {
    const {
      firstName,
      lastName,
      email,
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
    } = user;

    db.query(
      `UPDATE matrimony SET 
                firstName = ?, lastName = ?, email = ?, phone = ?, gender = ?,
                dob = ?, timeOfBirth = ?, placeOfBirth = ?, community = ?, religion = ?,
                caste = ?, subCaste = ?, motherTongue = ?, country = ?, state = ?,
                city = ?, address = ?, pincode = ?, maritalStatus = ?, haveChildren = ?,
                noOfChildren = ?, height = ?, weight = ?, complexion = ?, bodyType = ?,
                bloodGroup = ?, donateBlood = ?, qualification = ?, educationSpecialization = ?, currentLocation = ?,
                immigrationStatus = ?, designation = ?, designationDetails = ?, annualIncome = ?, fatherName = ?,
                fatherOccupation = ?, fatherMobile = ?, motherName = ?, motherOccupation = ?, motherMobile = ?,
                grandfatherName = ?, grandmotherName = ?, nanaName = ?, naniName = ?, noOfBrothers = ?,
                noOfSisters = ?, believeInHoroscope = ?, rashi = ?, gotra = ?, varna = ?,
                mangalShani = ?, diet = ?, smoke = ?, drink = ?, hobbies = ?,
                ageGap = ?, partnerReligion = ?, partnerCaste = ?, partnerSubCaste = ?, partnerQualification = ?, 
                partnerOccupation = ?, partnerAnnualIncome = ?, mangalik = ?, partnerMaritalStatus = ?, goAbroad = ?,
                disability = ?, disabilityPercentage = ?, about = ? WHERE id = ?`,
      [
        firstName,
        lastName,
        email,
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
        id,
      ],
      (error, results) => {
        if (error) {
          callback(error);
        }
        callback(null, results);
      }
    );
  },
  search: (user_id, search, callback) => {
    db.query(
      `SELECT 
          m.*, 
          (SELECT GROUP_CONCAT(mp.profilePicture) FROM matrimony_pictures mp WHERE mp.matrimony_id = m.id) as profilePictures,
          c.name as countryName,
          s.name as stateName,
          ci.name as cityName,
          ql.qualification_name as qualificationName,
          es.education_specialization_name as educationSpecializationName,
          cl.name as currentLocationName,
          ql2.qualification_name as partnerQualificationName
          FROM 
              matrimony m
          INNER JOIN 
              country c ON m.country = c.id
          INNER JOIN 
              states s ON m.state = s.id
          INNER JOIN 
              cities ci ON m.city = ci.id
          INNER JOIN 
              qualificationlevel ql ON m.qualification = ql.qualification_id
          INNER JOIN 
              educationspecialization es ON m.educationSpecialization = es.education_specialization_id
          INNER JOIN 
              country cl ON m.currentLocation = cl.id
          INNER JOIN 
              qualificationlevel ql2 ON m.partnerQualification = ql2.qualification_id
          WHERE
              m.id!=? AND
              (
                  m.firstName LIKE ? OR
                  m.lastName LIKE ? OR
                  m.id LIKE ? 
              )
          GROUP BY
              m.id;`,
      [user_id, `%${search}%`, `%${search}%`, `%${search}%`],
      (error, results) => {
        if (error) {
          callback(error);
        }
        callback(null, results);
      }
    );
  },
};

module.exports = Matrimony;
