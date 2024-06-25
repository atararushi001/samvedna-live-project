const db = require("../config/db.config");
const db_name = process.env.MYSQL_DATABASE;

const Admin = {
  register: (admin, callback) => {
    const { username, password } = admin;

    db.query(
      `INSERT INTO ${db_name}.admins (username, password) VALUES (?, ?)`,
      [username, password],
      callback
    );
  },
  login: (username, callback) => {
    db.query(
      `SELECT * FROM ${db_name}.admins WHERE username = ?;`,
      [username],
      callback
    );
  },
  getUsersCount: (callback) => {
    db.query(
      `SELECT 
      (SELECT COUNT(*) FROM recruiters) as recruiters, 
      (SELECT COUNT(*) FROM job_seekers) as jobSeekers, 
      (SELECT COUNT(*) FROM selfemployment) as selfEmployed, 
      (SELECT COUNT(*) FROM matrimony) as matrimonyUsers`,
      [],
      (error, results) => {
        if (error) {
          callback(error);
        }
        callback(null, results[0]);
      }
    );
  },
  getRecruiters: (callback) => {
    db.query(
      `
      SELECT DISTINCT recruiters.*, cities.name as cityName, states.name as stateName, country.name as countryName 
      FROM ${db_name}.recruiters 
      JOIN cities ON recruiters.city = cities.id 
      JOIN states ON recruiters.state = states.id 
      JOIN country ON recruiters.country = country.id
    `,
      [],
      callback
    );
  },
  getJobSeekers: (callback) => {
    db.query(
      `
      SELECT DISTINCT job_seekers.*, cities.name as cityName, states.name as stateName, country.name as countryName, educationspecialization.education_specialization_name as educationName, qualificationlevel.qualification_name as qualificationName
      FROM ${db_name}.job_seekers 
      JOIN cities ON job_seekers.city = cities.id 
      JOIN states ON job_seekers.state = states.id 
      JOIN country ON job_seekers.country = country.id
      JOIN educationspecialization ON job_seekers.educationSpecialization = educationspecialization.education_specialization_id 
      JOIN qualificationlevel ON job_seekers.qualification = qualificationlevel.qualification_id
    `,
      [],
      callback
    );
  },
  getContactQueries: (callback) => {
    db.query(`SELECT * FROM contact_query`, [], callback);
  },
  getSelfEmployees: (callback) => {
    db.query(
      `SELECT 
            selfemployment.*, 
            IFNULL(GROUP_CONCAT(product_selfemployment.ps_details), '-') AS products,
            professions.profession_name AS professionTypeName
        FROM 
            selfemployment
        JOIN 
            product_selfemployment 
            ON selfemployment.self_employement_id = product_selfemployment.self_employment_id
        JOIN 
            professions 
            ON selfemployment.professionType = professions.id
        GROUP BY 
            selfemployment.self_employement_id, 
            professions.profession_name;`,
      [],
      callback
    );
  },
  getMatrimonyUsers: (callback) => {
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
        GROUP BY 
            m.id,
            c.name, 
            s.name, 
            ci.name, 
            ql.qualification_name, 
            es.education_specialization_name, 
            cl.name, 
            ql2.qualification_name;`,
      [],
      callback
    );
  },
  deleteRecruiter: (id, callback) => {
    db.query(
      `DELETE FROM ${db_name}.recruiters WHERE recruiters_id = ?`,
      [id],
      callback
    );
  },
  deleteJobSeeker: (id, callback) => {
    db.query(
      `DELETE FROM ${db_name}.job_seekers WHERE job_seeker_id = ?`,
      [id],
      callback
    );
  },
  deleteSelfEmployed: (id, callback) => {
    db.query(
      `DELETE FROM ${db_name}.selfemployment WHERE self_employement_id = ?`,
      [id],
      callback
    );
  },
  deleteMatrimonyUser: (id, callback) => {
    db.query(`DELETE FROM ${db_name}.matrimony WHERE id = ?`, [id], callback);
  },
  deleteContactQuery: (id, callback) => {
    db.query(
      `DELETE FROM ${db_name}.contact_query WHERE id = ?`,
      [id],
      callback
    );
  },
  updateJobSeeker: (id, newJobSeeker, callback) => {
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
    } = newJobSeeker;

    console.log(newJobSeeker);

    let query = "";
    let columns = [];

    if (password) {
      query = `UPDATE ${db_name}.job_seekers SET email = ?, username = ?, password = ?, name = ?, lastName = ?, dob = ?, gender = ?, permanentAddress = ?, currentAddress = ?, city = ?, state = ?, postalCode = ?, country = ?, contactNumber = ?, whatsappNumber = ?, jobAlerts = ?, homePhone = ?, addHomePhone = ?, qualification = ?, educationSpecialization = ?, experienceAndAppliance = ?, yesNoQuestion = ?, twoWheeler = ?, threeWheeler = ?, car = ?, disabilityPercentage = ?, specializationInDisability = ? WHERE job_seeker_id = ?`;
      columns = [
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
        id,
      ];
    } else {
      query = `UPDATE ${db_name}.job_seekers SET email = ?, username = ?, name = ?, lastName = ?, dob = ?, gender = ?, permanentAddress = ?, currentAddress = ?, city = ?, state = ?, postalCode = ?, country = ?, contactNumber = ?, whatsappNumber = ?, jobAlerts = ?, homePhone = ?, addHomePhone = ?, qualification = ?, educationSpecialization = ?, experienceAndAppliance = ?, yesNoQuestion = ?, twoWheeler = ?, threeWheeler = ?, car = ?, disabilityPercentage = ?, specializationInDisability = ? WHERE job_seeker_id = ?`;
      columns = [
        email,
        username,
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
        id,
      ];
    }

    db.query(query, columns, (err, result) => {
      if (err) {
        callback(err, null); // Pass the error to the callback
        return;
      }

      if (result.affectedRows === 0) {
        // Handle case where no rows were updated (e.g., jobSeeker not found)
        callback(new Error("No job seeker updated"), null);
        return;
      }

      callback(null, result); // Pass successful update
    });
  },
  updateMatrimonyUser: (id, matrimonyUser, callback) => {
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
    } = matrimonyUser;

    let query = "";
    let columns = [];

    if (password) {
      query = `UPDATE matrimony SET 
                  firstName = ?, lastName = ?, email = ?, password = ?, phone = ?, gender = ?,
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
                  disability = ?, disabilityPercentage = ?, about = ? WHERE id = ?`;
      columns = [firstName, lastName, email, password, phone, gender, dob, timeOfBirth, placeOfBirth, community, religion, caste, subCaste, motherTongue, country, state, city, address, pincode, maritalStatus, haveChildren, noOfChildren, height, weight, complexion, bodyType, bloodGroup, donateBlood, qualification, educationSpecialization, currentLocation, immigrationStatus, designation, designationDetails, annualIncome, fatherName, fatherOccupation, fatherMobile, motherName, motherOccupation, motherMobile, grandfatherName, grandmotherName, nanaName, naniName, noOfBrothers, noOfSisters, believeInHoroscope, rashi, gotra, varna, mangalShani, diet, smoke, drink, hobbies, ageGap, partnerReligion, partnerCaste, partnerSubCaste, partnerQualification, partnerOccupation, partnerAnnualIncome, mangalik, partnerMaritalStatus, goAbroad, disability, disabilityPercentage, about, id];
    } else {
      query = `UPDATE matrimony SET 
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
                  disability = ?, disabilityPercentage = ?, about = ? WHERE id = ?`;
      columns = [firstName, lastName, email, phone, gender, dob, timeOfBirth, placeOfBirth, community, religion, caste, subCaste, motherTongue, country, state, city, address, pincode, maritalStatus, haveChildren, noOfChildren, height, weight, complexion, bodyType, bloodGroup, donateBlood, qualification, educationSpecialization, currentLocation, immigrationStatus, designation, designationDetails, annualIncome, fatherName, fatherOccupation, fatherMobile, motherName, motherOccupation, motherMobile, grandfatherName, grandmotherName, nanaName, naniName, noOfBrothers, noOfSisters, believeInHoroscope, rashi, gotra, varna, mangalShani, diet, smoke, drink, hobbies, ageGap, partnerReligion, partnerCaste, partnerSubCaste, partnerQualification, partnerOccupation, partnerAnnualIncome, mangalik, partnerMaritalStatus, goAbroad, disability, disabilityPercentage, about, id];
    }

    db.query(
      query,
      columns,
      (error, results) => {
        if (error) {
          callback(error);
        }
        callback(null, results);
      }
    );

  }
};

module.exports = Admin;
