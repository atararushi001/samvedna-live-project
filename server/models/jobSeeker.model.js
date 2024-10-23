const db = require("../config/db.config");
const db_name = process.env.MYSQL_DATABASE;
const JobSeeker = {
  getAll: (callback) => {
    const jobSeekerQuery = `SELECT * FROM ${db_name}.job_seekers`;
    const educationQuery = `SELECT * FROM ${db_name}.education_job_seekers WHERE education_jobSeekerId = ?`;
    const experienceQuery = `SELECT * FROM ${db_name}.experience_job_seekers WHERE jobSeekerId = ?`;
    const referencesQuery = `SELECT * FROM ${db_name}.professionalreferences_job_seekers_id WHERE professionalreferencesjob_seekers_id = ?`;

    db.query(jobSeekerQuery, (err, jobSeekers) => {
      if (err) {
        return callback(err);
      }

      const jobSeekerPromises = jobSeekers.map((jobSeeker) => {
        return new Promise((resolve, reject) => {
          db.query(
            educationQuery,
            [jobSeeker.job_seeker_id],
            (err, educations) => {
              if (err) {
                return reject(err);
              }

              jobSeeker.education = educations;

              db.query(
                experienceQuery,
                [jobSeeker.job_seeker_id],
                (err, experiences) => {
                  if (err) {
                    return reject(err);
                  }

                  jobSeeker.Experience = experiences;

                  db.query(
                    referencesQuery,
                    [jobSeeker.job_seeker_id],
                    (err, references) => {
                      if (err) {
                        return reject(err);
                      }

                      jobSeeker.professionalReferences = references;

                      resolve(jobSeeker);
                    }
                  );
                }
              );
            }
          );
        });
      });

      Promise.all(jobSeekerPromises)
        .then((jobSeekersWithDetails) => {
          callback(null, jobSeekersWithDetails);
        })
        .catch((err) => {
          callback(err);
        });
    });
  },
  // create: (newJobSeeker, callback) => {
  //   try {
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
  //       photo,
  //       resume,
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
  //     } = newJobSeeker;

  //     // Ensure all fields have a value or NULL
  //     const values = [
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
  //       photo,
  //       resume,
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
  //     ];

  //     const insertQuery = `
  //     INSERT INTO ${db_name}.job_seekers (
  //       email, username, password, confirmPassword, FirstName, FatherName, Surname, lastName, artSkills, employmentGapReason, employmentGapDuration, languageProficiency, hobbiesOrInterests, professionalMemberships, careerObjective, otherRelevantInfo, notableAchievements, jobCategories, preferredLocation, jobType, accommodationsNeeded, transportationNeeded, specificNeed, softwareRequirements, specificEquipment, photo, resume, dob, gender, permanentAddress, currentAddress, city, state, postalCode, country, contactNumber, whatsappNumber, AadharCardNumber, LinkedInID, jobAlerts, homePhone, addHomePhone, qualification, educationSpecialization, typeOfDisability, transportationMobility, specificDisability, levelOfDisability, assistiveTechnology, experienceAndAppliance, yesNoQuestion, twoWheeler, threeWheeler, car, disabilityPercentage, specializationInDisability
  //     ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  //     db.query("START TRANSACTION", (err) => {
  //       if (err) {
  //         console.error("Transaction start error:", err);
  //         return callback(err, null);
  //       }

  //       db.query(insertQuery, values, (err, result) => {
  //         if (err) {
  //           console.error("Insert query error:", err);

  //           return;
  //         } else {
  //           const jobSeekerId = result.insertId;
  //           console.log("Job Seeker ID:", result);

  //           const educationPromises = education.map((educations) => {
  //             return new Promise((resolve, reject) => {
  //               db.query(
  //                 `INSERT INTO ${db_name}.education_job_seekers (education_jobSeekerId, institutionName, country, state, city) VALUES (?, ?, ?, ?, ?)`,
  //                 [
  //                   jobSeekerId,
  //                   educations.institutionName,
  //                   educations.country,
  //                   educations.state,
  //                   educations.city,
  //                 ],
  //                 (err, result) => {
  //                   if (err) {
  //                     console.error("Education insert error:", err);
  //                     return reject(err);
  //                   }
  //                   resolve(result);
  //                 }
  //               );
  //             });
  //           });

  //           const experiencePromises = Experience.map((experiences) => {
  //             return new Promise((resolve, reject) => {
  //               db.query(
  //                 `INSERT INTO ${db_name}.experience_job_seekers (jobSeekerId, companyName, Jobtitle, startDate, endDate, JobDescriptions, Projects) VALUES (?, ?, ?, ?, ?, ?, ?)`,
  //                 [
  //                   jobSeekerId,
  //                   experiences.companyname,
  //                   experiences.jobTitle,
  //                   experiences.startDate,
  //                   experiences.endDate,
  //                   experiences.JobDescriptions,
  //                   experiences.Projects,
  //                 ],
  //                 (err, result) => {
  //                   if (err) {
  //                     console.error("Experience insert error:", err);
  //                     return reject(err);
  //                   }
  //                   resolve(result);
  //                 }
  //               );
  //             });
  //           });

  //           const referencesPromises = professionalReferences.map(
  //             (references) => {
  //               return new Promise((resolve, reject) => {
  //                 db.query(
  //                   `INSERT INTO ${db_name}.professionalreferences_job_seekers_id (professionalreferencesjob_seekers_id, name, companyName, phoneNumber, email, relationship) VALUES (?, ?, ?, ?, ?, ?)`,
  //                   [
  //                     jobSeekerId,
  //                     references.name,
  //                     references.companyName,
  //                     references.phoneNumber,
  //                     references.email,
  //                     references.relationship,
  //                   ],
  //                   (err, result) => {
  //                     if (err) {
  //                       console.error("References insert error:", err);
  //                       return reject(err);
  //                     }
  //                     resolve(result);
  //                   }
  //                 );
  //               });
  //             }
  //           );

  //           Promise.all([
  //             ...educationPromises,
  //             ...experiencePromises,
  //             ...referencesPromises,
  //           ])
  //             .then(() => {
  //               db.query("COMMIT", (err) => {
  //                 if (err) {
  //                   console.error("Commit error:", err);
  //                   return callback(err, null);
  //                 } else {
  //                   callback(null, {
  //                     success: true,
  //                     message: "Job Seeker created successfully",
  //                   });
  //                 }
  //               });
  //             })
  //             .catch((err) => {
  //               console.error("Promise error:", err);
  //               db.query("ROLLBACK", (err) => {
  //                 console.error("Rollback error:", err);
  //               });
  //             });
  //         }
  //       });
  //     });
  //   } catch (err) {
  //     console.error("Error creating job seeker:", err);
  //     callback(err, null);
  //   }
  // },
  create: (newJobSeeker, callback) => {
    const { email, password } = newJobSeeker;

    // db.query("START TRANSACTION", (err) => {
    //   if (err) {
    //     callback(err, null);
    //     return;
    //   }

    const insertJobSeekerQuery = `INSERT INTO ${db_name}.job_seekers (
        email, password ) VALUES (?, ?);`;

    db.query(insertJobSeekerQuery, [email, password], (err, result) => {
      if (err) {
        return callback(err);
      } else {
        callback(null, {
          success: true,
          message: "Job Seeker created successfully",
        });
      }
    });
  },
  // update: (id, newJobSeeker, callback) => {
  //   const {
  //     email,
  //     username,
  //     FirstName,
  //     FatherName,
  //     Surname,
  //     lastName,
  //     artSkills,
  //     employmentGapReason,
  //     employmentGapDuration,
  //     languageProficiency,
  //     hobbiesOrInterests,
  //     professionalMemberships,
  //     careerObjective,
  //     otherRelevantInfo,
  //     notableAchievements,
  //     jobCategories,
  //     preferredLocation,
  //     jobType,
  //     accommodationsNeeded,
  //     transportationNeeded,
  //     specificNeed,
  //     softwareRequirements,
  //     specificEquipment,
  //     photo,
  //     resume,
  //     dob,
  //     gender,
  //     permanentAddress,
  //     currentAddress,
  //     city,
  //     state,
  //     postalCode,
  //     country,
  //     contactNumber,
  //     whatsappNumber,
  //     AadharCardNumber,
  //     LinkedInID,
  //     jobAlerts,
  //     homePhone,
  //     addHomePhone,
  //     qualification,
  //     educationSpecialization,
  //     typeOfDisability,
  //     transportationMobility,
  //     specificDisability,
  //     levelOfDisability,
  //     assistiveTechnology,
  //     experienceAndAppliance,
  //     yesNoQuestion,
  //     twoWheeler,
  //     threeWheeler,
  //     car,
  //     disabilityPercentage,
  //     specializationInDisability,
  //     education,
  //     Experience,
  //     professionalReferences,
  //   } = newJobSeeker;

  //   // Parse the input fields
  //   const parsedEducation =
  //     typeof education === "string" ? JSON.parse(education) : education;
  //   const educationArray = Array.isArray(parsedEducation)
  //     ? parsedEducation
  //     : parsedEducation
  //     ? [parsedEducation]
  //     : [];

  //   const parsedExperience =
  //     typeof Experience === "string" ? JSON.parse(Experience) : Experience;
  //   const experienceArray = Array.isArray(parsedExperience)
  //     ? parsedExperience
  //     : parsedExperience
  //     ? [parsedExperience]
  //     : [];

  //   const parsedProfessionalReferences =
  //     typeof professionalReferences === "string"
  //       ? JSON.parse(professionalReferences)
  //       : professionalReferences;
  //   const professionalReferencesArray = Array.isArray(
  //     parsedProfessionalReferences
  //   )
  //     ? parsedProfessionalReferences
  //     : parsedProfessionalReferences
  //     ? [parsedProfessionalReferences]
  //     : [];

  //   db.query("START TRANSACTION", (err, result) => {
  //     if (err) {
  //       callback(err, null);
  //       return;
  //     }

  //     db.query(
  //       `UPDATE ${db_name}.job_seekers SET
  //         email = ?, username = ?, FirstName = ?, FatherName = ?, Surname = ?, lastName = ?, artSkills = ?, employmentGapReason = ?, employmentGapDuration = ?, languageProficiency = ?, hobbiesOrInterests = ?, professionalMemberships = ?, careerObjective = ?, otherRelevantInfo = ?, notableAchievements = ?, jobCategories = ?, preferredLocation = ?, jobType = ?, accommodationsNeeded = ?, transportationNeeded = ?, specificNeed = ?, softwareRequirements = ?, specificEquipment = ?, photo = ?, resume = ?, dob = ?, gender = ?, permanentAddress = ?, currentAddress = ?, city = ?, state = ?, postalCode = ?, country = ?, contactNumber = ?, whatsappNumber = ?, AadharCardNumber = ?, LinkedInID = ?, jobAlerts = ?, homePhone = ?, addHomePhone = ?, qualification = ?, educationSpecialization = ?, typeOfDisability = ?, transportationMobility = ?, specificDisability = ?, levelOfDisability = ?, assistiveTechnology = ?, experienceAndAppliance = ?, yesNoQuestion = ?, twoWheeler = ?, threeWheeler = ?, car = ?, disabilityPercentage = ?, specializationInDisability = ? WHERE job_seeker_id = ?`,
  //       [
  //         email,
  //         username,
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
  //         id,
  //       ],
  //       (err, result) => {
  //         if (err) {
  //           return callback(err);
  //         }

  //         if (result.affectedRows === 0) {
  //           return callback(new Error("No job seeker updated"), null);
  //         }

  //         const deleteEducationQuery = `DELETE FROM ${db_name}.education_job_seekers WHERE education_jobSeekerId = ?`;
  //         const deleteExperienceQuery = `DELETE FROM ${db_name}.experience_job_seekers WHERE jobSeekerId = ?`;
  //         const deleteReferencesQuery = `DELETE FROM ${db_name}.professionalreferences_job_seekers_id WHERE professionalreferencesjob_seekers_id = ?`;

  //         db.query(deleteEducationQuery, [id], (err, result) => {
  //           if (err) {
  //             return callback(err);
  //           }

  //           db.query(deleteExperienceQuery, [id], (err, result) => {
  //             if (err) {
  //               return callback(err);
  //             }

  //             db.query(deleteReferencesQuery, [id], (err, result) => {
  //               if (err) {
  //                 return callback(err);
  //               }

  //               const educationPromises = educationArray.map((educations) => {
  //                 return new Promise((resolve, reject) => {
  //                   db.query(
  //                     `INSERT INTO ${db_name}.education_job_seekers (education_jobSeekerId, institutionName, country, state, city) VALUES (?, ?, ?, ?, ?)`,
  //                     [
  //                       id,
  //                       educations.institutionName,
  //                       educations.country,
  //                       educations.state,
  //                       educations.city,
  //                     ],
  //                     (err, result) => {
  //                       if (err) {
  //                         return reject(err);
  //                       }
  //                       resolve(result);
  //                     }
  //                   );
  //                 });
  //               });

  //               const experiencePromises = experienceArray.map(
  //                 (experiences) => {
  //                   return new Promise((resolve, reject) => {
  //                     db.query(
  //                       `INSERT INTO ${db_name}.experience_job_seekers (jobSeekerId, companyName, Jobtitle, startDate, endDate, JobDescriptions, Projects) VALUES (?, ?, ?, ?, ?, ?, ?)`,
  //                       [
  //                         id,
  //                         experiences.companyname,
  //                         experiences.Jobtitle,
  //                         experiences.startDate,
  //                         experiences.endDate,
  //                         experiences.JobDescriptions,
  //                         experiences.Projects,
  //                       ],
  //                       (err, result) => {
  //                         if (err) {
  //                           return reject(err);
  //                         }
  //                         resolve(result);
  //                       }
  //                     );
  //                   });
  //                 }
  //               );

  //               const referencesPromises = professionalReferencesArray.map(
  //                 (references) => {
  //                   return new Promise((resolve, reject) => {
  //                     db.query(
  //                       `INSERT INTO ${db_name}.professionalreferences_job_seekers_id (professionalreferencesjob_seekers_id, name, companyName, phoneNumber, email, relationship) VALUES (?, ?, ?, ?, ?, ?)`,
  //                       [
  //                         id,
  //                         references.name,
  //                         references.companyName,
  //                         references.phoneNumber,
  //                         references.email,
  //                         references.relationship,
  //                       ],
  //                       (err, result) => {
  //                         if (err) {
  //                           return reject(err);
  //                         }
  //                         resolve(result);
  //                       }
  //                     );
  //                   });
  //                 }
  //               );

  //               Promise.all([
  //                 ...educationPromises,
  //                 ...experiencePromises,
  //                 ...referencesPromises,
  //               ])
  //                 .then(() => {
  //                   db.query("COMMIT", (err) => {
  //                     if (err) {
  //                       return callback(err, null);
  //                     }

  //                     callback(null, {
  //                       success: true,
  //                       message: "Job Seeker updated successfully",
  //                     });
  //                   });
  //                 })
  //                 .catch((err) => {
  //                   db.query("ROLLBACK", () => {
  //                     callback(err, null);
  //                   });
  //                 });
  //             });
  //           });
  //         });
  //       }
  //     );
  //   });
  // },
  update: (id, newJobSeeker, callback) => {
    const {
      email,
      username,
      FirstName,
      FatherName,
      Surname,
      accommodationsNeeded,
      addHomePhone,
      artSkills,
      car,
      careerObjective,
      city,
      contactNumber,
      country,
      currentAddress,
      disabilityPercentage,
      dob,
      education,
      educationSpecialization,
      employmentGapDuration,
      employmentGapReason,
      experience,
      experienceAndAppliance,
      gender,
      hobbiesOrInterests,
      homePhone,
      jobAlerts,
      jobCategories,
      jobType,
      languageProficiency,
      lastName,
      name,
      notableAchievements,
      otherRelevantInfo,
      permanentAddress,
      photo,
      postalCode,
      preferredLocation,
      professionalMemberships,
      professionalReferences,
      qualification,
      resume,
      softwareRequirements,
      specializationInDisability,
      specificEquipment,
      specificNeed,
      state,
      threeWheeler,
      transportationNeeded,
      twoWheeler,
      whatsappNumber,
      yesNoQuestion,
      AadharCardNumber,
      LinkedInID,
      typeOfDisability,
      transportationMobility,
      specificDisability,
      levelOfDisability,
      assistiveTechnology,
    } = newJobSeeker;

    db.getConnection((err, connection) => {
      if (err) {
        console.error("Error getting database connection:", err);
        return callback(err);
      }

      connection.beginTransaction((err) => {
        if (err) {
          connection.release();
          console.error("Error beginning transaction:", err);
          return callback(err);
        }

        const updateJobSeekerQuery = `
          UPDATE ${db_name}.job_seekers SET 
          email = ?, username = ?, FirstName = ?, FatherName = ?, Surname = ?, 
          accommodationsNeeded = ?, addHomePhone = ?, artSkills = ?, car = ?, 
          careerObjective = ?, city = ?, contactNumber = ?, country = ?, 
          currentAddress = ?, disabilityPercentage = ?, dob = ?, 
          educationSpecialization = ?, employmentGapDuration = ?, 
          employmentGapReason = ?, experienceAndAppliance = ?, gender = ?, 
          hobbiesOrInterests = ?, homePhone = ?, jobAlerts = ?, jobCategories = ?, 
          jobType = ?, languageProficiency = ?, lastName = ?, name = ?, 
          notableAchievements = ?, otherRelevantInfo = ?, permanentAddress = ?, 
          photo = ?, postalCode = ?, preferredLocation = ?, 
          professionalMemberships = ?, qualification = ?, resume = ?, 
          softwareRequirements = ?, specializationInDisability = ?, 
          specificEquipment = ?, specificNeed = ?, state = ?, threeWheeler = ?, 
          transportationNeeded = ?, twoWheeler = ?, whatsappNumber = ?, 
          yesNoQuestion = ?, AadharCardNumber = ?, LinkedInID = ?,
          typeOfDisability = ?, transportationMobility = ?, specificDisability = ?,
          levelOfDisability = ?, assistiveTechnology = ?
          WHERE job_seeker_id = ?
        `;

        const updateValues = [
          email,
          username,
          FirstName,
          FatherName,
          Surname,
          accommodationsNeeded,
          addHomePhone,
          artSkills,
          car,
          careerObjective,
          city,
          contactNumber,
          country,
          currentAddress,
          disabilityPercentage,
          dob,
          educationSpecialization,
          employmentGapDuration,
          employmentGapReason,
          experienceAndAppliance,
          gender,
          hobbiesOrInterests,
          homePhone,
          jobAlerts,
          jobCategories,
          jobType,
          languageProficiency,
          lastName,
          name,
          notableAchievements,
          otherRelevantInfo,
          permanentAddress,
          photo,
          postalCode,
          preferredLocation,
          professionalMemberships,
          qualification,
          resume,
          softwareRequirements,
          specializationInDisability,
          specificEquipment,
          specificNeed,
          state,
          threeWheeler,
          transportationNeeded,
          twoWheeler,
          whatsappNumber,
          yesNoQuestion,
          AadharCardNumber,
          LinkedInID,
          typeOfDisability,
          transportationMobility,
          specificDisability,
          levelOfDisability,
          assistiveTechnology,
          id,
        ];

        connection.query(updateJobSeekerQuery, updateValues, (err, result) => {
          if (err) {
            return rollbackAndRelease(connection, err, callback);
          }

          if (result.affectedRows === 0) {
            return rollbackAndRelease(
              connection,
              new Error(`No job seeker found with id: ${id}`),
              callback
            );
          }

          console.log(
            `Job seeker updated successfully. Rows affected: ${result.affectedRows}`
          );
          updateRelatedTables(
            connection,
            id,
            education,
            experience,
            professionalReferences,
            callback
          );
        });
      });
    });
  },
  getByEmail: (email, callback) => {
    db.query(
      `SELECT * FROM ${db_name}.job_seekers WHERE email = ?`,
      [email],
      callback
    );
  },
  getById: (id, callback) => {
    const jobSeekerQuery = `SELECT * FROM job_seekers WHERE job_seeker_id = ?`;
    const educationQuery = `SELECT * FROM education_job_seekers WHERE education_jobSeekerId = ?`;
    const experienceQuery = `SELECT * FROM experience_job_seekers WHERE jobSeekerId = ?`;
    const referencesQuery = `SELECT * FROM professionalreferences_job_seekers_id WHERE professionalreferencesjob_seekers_id = ?`;

    db.query(jobSeekerQuery, [id], (err, jobSeekers) => {
      if (err) {
        console.error("Error querying job_seekers:", err);
        return callback(err);
      }

      if (jobSeekers.length === 0) {
        return callback(new Error("No job seeker found!"));
      }

      const jobSeeker = jobSeekers[0];

      db.query(educationQuery, [jobSeeker.job_seeker_id], (err, educations) => {
        if (err) {
          console.error("Error querying education_job_seekers:", err);
          return callback(err);
        }

        jobSeeker.education = educations;

        db.query(
          experienceQuery,
          [jobSeeker.job_seeker_id],
          (err, experiences) => {
            if (err) {
              console.error("Error querying experience_job_seekers:", err);
              return callback(err);
            }

            jobSeeker.experience = experiences;

            db.query(
              referencesQuery,
              [jobSeeker.job_seeker_id],
              (err, references) => {
                if (err) {
                  console.error(
                    "Error querying professionalreferences_job_seekers_id:",
                    err
                  );
                  return callback(err);
                }

                jobSeeker.professionalReferences = references;

                callback(null, jobSeeker);
              }
            );
          }
        );
      });
    });
  },
  getCompanyDirectory: (callback) => {
    db.query(
      `SELECT DISTINCT r.*, c.name AS cityname FROM ${db_name}.recruiters r JOIN ${db_name}.cities c ON r.city = c.id`,
      callback
    );
  },
  getResumeById: (id, callback) => {
    db.query(
      `SELECT * FROM ${db_name}.resumes WHERE resume_id = ?`,
      [id],
      callback
    );
  },
  getFullResume: (id, callback) => {
    if (!id) {
      return callback(new Error("Resume id is required"));
    }

    const resumeQuery = `SELECT resumes.*, country.name AS countryname, states.name AS statename, cities.name AS cityname FROM resumes LEFT JOIN country ON resumes.country = country.id LEFT JOIN states ON resumes.state = states.id LEFT JOIN cities ON resumes.city = cities.id WHERE resume_id = ?`;
    const employersQuery = `SELECT employers.*, positions.* FROM employers LEFT JOIN positions ON employers.employer_id = positions.employer_id WHERE employers.resume_id = ?`;
    const educationQuery = `SELECT education.*, degrees.* FROM education LEFT JOIN degrees ON education.institution_id = degrees.institution_id WHERE education.resume_id = ?`;
    const branchesQuery = `SELECT * FROM branches WHERE resume_id = ?`;

    db.query(resumeQuery, [id], (err, resumes) => {
      if (err) {
        return callback(err);
      }

      if (resumes.length === 0) {
        return callback(new Error("No job resume found!"));
      }

      const resume = resumes[0];

      const results = {
        ...resume,
        employers: [],
        education: [],
        branches: [],
        desiredJobType: resume.desiredJobType.split(","),
      };

      db.query(employersQuery, [id], (err, employers) => {
        if (err) {
          return callback(err);
        }

        employers.forEach((employer) => {
          const existingEmployer = results.employers.find(
            (e) => e.employerName === employer.employerName
          );

          if (existingEmployer) {
            existingEmployer.positions.push(employer);
          } else {
            results.employers.push({
              employerName: employer.employerName,
              employer_id: employer.employer_id,
              positions: [employer],
            });
          }
        });

        db.query(educationQuery, [id], (err, educations) => {
          if (err) {
            return callback(err);
          }

          educations.forEach((education) => {
            results.education.push({
              institutionName: education.institutionName,
              institution_id: education.institution_id,
              degrees: [education],
            });
          });

          db.query(branchesQuery, [id], (err, branches) => {
            if (err) {
              return callback(err);
            }

            results.branches = branches;

            callback(null, results);
          });
        });
      });
    });
  },
  getAllUserResumes: (jobSeekerId, callback) => {
    const baseQuery = `SELECT * FROM resumes WHERE resumes.job_seeker_id = ?`;
    const publishedQuery = `${baseQuery} AND resumes.published = true GROUP BY resumes.resume_id`;
    const privateQuery = `${baseQuery} AND resumes.published = false GROUP BY resumes.resume_id`;

    db.query(publishedQuery, [jobSeekerId], (err, publishedResumes) => {
      if (err) {
        return callback(err);
      }

      db.query(privateQuery, [jobSeekerId], (err, privateResumes) => {
        if (err) {
          return callback(err);
        }

        const results = {
          publicResumes: publishedResumes,
          privateResumes: privateResumes,
        };

        callback(null, results);
      });
    });
  },
  createResume: (newResume, callback) => {
    const {
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
    } = newResume;

    const desiredJobTypeValues = Array.isArray(desiredJobType)
      ? desiredJobType.join(",")
      : desiredJobType;

    db.query(
      `INSERT INTO ${db_name}.resumes (
        job_seeker_id, resumeName, firstName, lastName, suffix, email, 
        phone, website, linkedin, country, state, 
        city, postalCode, summary, objective, militaryStatus,
        militaryAdditionalInfo, desiredPay, desiredCurrency, desiredPaytime, additionalPreferences, 
        published, desiredJobType) VALUES (
          ?, ?, ?, ?, ?, ?, 
          ?, ?, ?, ?, ?, 
          ?, ?, ?, ?, ?, 
          ?, ?, ?, ?, ?, 
          ?, ?)`,
      [
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
        desiredJobTypeValues,
      ],
      (err, result) => {
        if (err) {
          callback(err, null);
        } else {
          const resumeId = result.insertId;

          employers.forEach((employer) => {
            db.query(
              `INSERT INTO ${db_name}.employers (resume_id, employerName) VALUES (?, ?)`,
              [resumeId, employer.employerName],
              (err, result) => {
                if (err) {
                  callback(err, null);
                } else {
                  const employerId = result.insertId;

                  employer.positions.forEach((position) => {
                    db.query(
                      `INSERT INTO ${db_name}.positions (employer_id, positionTitle, startDate, endDate, isCurrentPosition, jobDescription) VALUES (?, ?, ?, ?, ?, ?)`,
                      [
                        employerId,
                        position.positionTitle,
                        position.startDate,
                        position.endDate,
                        position.isCurrentPosition,
                        position.jobDescription,
                      ],
                      (err, result) => {
                        if (err) {
                          callback(err, null);
                        }
                      }
                    );
                  });
                }
              }
            );
          });

          education.forEach((education) => {
            db.query(
              `INSERT INTO ${db_name}.education (resume_id, institutionName,) VALUES (?, ?)`,
              [resumeId, education.institutionName],
              (err, result) => {
                if (err) {
                  callback(err, null);
                } else {
                  const educationId = result.insertId;

                  education.degrees.forEach((degree) => {
                    db.query(
                      `INSERT INTO ${db_name}.degrees (degree, educationCompleted, graduationDate, major, additionalInfo, grade, outOf, institution_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
                      [
                        degree.degree,
                        degree.educationCompleted,
                        degree.graduationDate,
                        degree.major,
                        degree.additionalInfo,
                        degree.grade,
                        degree.outOf,
                        educationId,
                      ],
                      (err, result) => {
                        if (err) {
                          callback(err, null);
                        }
                      }
                    );
                  });
                }
              }
            );
          });

          branches.forEach((branch) => {
            db.query(
              `INSERT INTO ${db_name}.branches (resume_id, branch, unit, beginningRank, endingRank, startDate, endDate, areaOfExpertise, recognition) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
              [
                resumeId,
                branch.branch,
                branch.unit,
                branch.beginningRank,
                branch.endingRank,
                branch.startDate,
                branch.endDate,
                branch.areaOfExpertise,
                branch.recognition,
              ],
              (err, result) => {
                if (err) {
                  callback(err, null);
                }
              }
            );
          });

          callback(null, {
            success: true,
            message: "Data inserted successfully",
          });
        }
      }
    );
  },
  updateResume: (resumeId, updatedResume, callback) => {
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
    } = updatedResume;

    let publishedOn = null;

    if (published) {
      publishedOn = new Date().toISOString().slice(0, 19).replace("T", " ");
    }

    db.query("START TRANSACTION", (err, result) => {
      if (err) {
        callback(err, null);
        return;
      }
      // Update the resume
      const desiredJobTypeValues = Array.isArray(desiredJobType)
        ? desiredJobType.join(",")
        : desiredJobType;
      db.query(
        `UPDATE ${db_name}.resumes SET
            resumeName = ?, firstName = ?, lastName = ?, suffix = ?, email = ?, 
            phone = ?, website = ?, linkedin = ?, country = ?, state = ?, 
            city = ?, postalCode = ?, summary = ?, objective = ?, militaryStatus = ?,
            militaryAdditionalInfo = ?, desiredPay = ?, desiredCurrency = ?, desiredPaytime = ?, additionalPreferences = ?, 
            published = ?, desiredJobType = '${desiredJobTypeValues}', published_on = ? WHERE resume_id = ?`,
        [
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
          publishedOn,
          resumeId,
        ],
        (err, result) => {
          if (err) {
            return callback(err);
          }
          const deleteEmployersQuery = `DELETE FROM ${db_name}.employers WHERE resume_id = ?`;
          const deleteEducationQuery = `DELETE FROM ${db_name}.education WHERE resume_id = ?`;
          const deleteBranchesQuery = `DELETE FROM ${db_name}.branches WHERE resume_id = ?`;

          db.query(deleteEmployersQuery, [resumeId], (err, result) => {
            if (err) {
              return callback(err);
            }

            db.query(deleteEducationQuery, [resumeId], (err, result) => {
              if (err) {
                db.query("ROLLBACK", (err, result) => {
                  callback(err, null);
                });
                return;
              }

              db.query(deleteBranchesQuery, [resumeId], (err, result) => {
                if (err) {
                  db.query("ROLLBACK", (err, result) => {
                    callback(err, null);
                  });
                  return;
                }

                employers.forEach((employer) => {
                  db.query(
                    `INSERT INTO ${db_name}.employers (resume_id, employerName) VALUES (?, ?)`,
                    [resumeId, employer.employerName],
                    (err, result) => {
                      if (err) {
                        // Rollback the transaction and return an error
                        // db.query("ROLLBACK", (err, result) => {
                        //   callback(err, null);
                        // });
                        return;
                      }

                      const employerId = result.insertId;

                      employer.positions.forEach((position) => {
                        db.query(
                          `INSERT INTO ${db_name}.positions (employer_id, positionTitle, startDate, endDate, isCurrentPosition, jobDescription) VALUES (?, ?, ?, ?, ?, ?)`,
                          [
                            employerId,
                            position.positionTitle,
                            position.startDate,
                            position.endDate,
                            position.isCurrentPosition,
                            position.jobDescription,
                          ],
                          (err, result) => {
                            if (err) {
                              db.query("ROLLBACK", (err, result) => {
                                callback(err, null);
                              });
                              return;
                            }
                          }
                        );
                      });
                    }
                  );
                });

                education.forEach((education) => {
                  db.query(
                    `INSERT INTO ${db_name}.education (resume_id, institutionName) VALUES (?, ?)`,
                    [resumeId, education.institutionName],
                    (err, result) => {
                      if (err) {
                        db.query("ROLLBACK", (err, result) => {
                          callback(err, null);
                        });
                        return;
                      }

                      const educationId = result.insertId;

                      education.degrees.forEach((degree) => {
                        db.query(
                          `INSERT INTO ${db_name}.degrees (degree, educationCompleted, graduationDate, major, additionalInfo, grade, outOf, institution_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
                          [
                            degree.degree,
                            degree.educationCompleted,
                            degree.graduationDate,
                            degree.major,
                            degree.additionalInfo,
                            degree.grade,
                            degree.outOf,
                            educationId,
                          ],
                          (err, result) => {
                            if (err) {
                              db.query("ROLLBACK", (err, result) => {
                                callback(err, null);
                              });
                              return;
                            }
                          }
                        );
                      });
                    }
                  );
                });

                branches.forEach((branch) => {
                  db.query(
                    `INSERT INTO ${db_name}.branches (resume_id, branch, unit, beginningRank, endingRank, startDate, endDate, areaOfExpertise, recognition) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                    [
                      resumeId,
                      branch.branch,
                      branch.unit,
                      branch.beginningRank,
                      branch.endingRank,
                      branch.startDate,
                      branch.endDate,
                      branch.areaOfExpertise,
                      branch.recognition,
                    ],
                    (err, result) => {
                      if (err) {
                        db.query("ROLLBACK", (err, result) => {
                          callback(err, null);
                        });
                        return;
                      }

                      db.query("COMMIT", (err, result) => {
                        if (err) {
                          callback(err, null);
                          return;
                        }

                        callback(null, {
                          success: true,
                          message: "Resume updated successfully",
                        });
                      });
                    }
                  );
                });
              });
            });
          });
        }
      );
    });
  },
  deleteResume: (id, callback) => {
    db.query(
      `DELETE FROM ${db_name}.resumes WHERE resume_id = ?`,
      [id],
      callback
    );
  },
  getJobs: (searchJob, callback) => {
    const {
      search,
      status,
      postedBetweenStart,
      postedBetweenEnd,
      country,
      state,
    } = searchJob;

    db.query(
      `SELECT ${db_name}.job.*, ${db_name}.recruiters.profilePicture FROM ${db_name}.job JOIN ${db_name}.recruiters ON j${db_name}.ob.recruiter_id = ${db_name}.recruiters.recruiters_id WHERE ${db_name}.job.jobDesignation LIKE ? OR ${db_name}.job.jobStatus = ? OR ${db_name}.job.country = ? OR ${db_name}.job.state = ? OR (${db_name}.job.postedOn >= ? AND ${db_name}.job.postedOn <= ?)`,
      [
        `%${search}%`,
        status,
        country,
        state,
        postedBetweenStart,
        postedBetweenEnd,
      ],
      callback
    );
  },
  searchJobSeeker: (searchCriteria, callback) => {
    const { search, email, firstName, lastName } = searchCriteria;

    const jobSeekerQuery = `
      SELECT * FROM ${db_name}.job_seekers 
      WHERE 
        (email LIKE ? OR ? IS NULL) AND
        (firstName LIKE ? OR ? IS NULL) AND
        (lastName LIKE ? OR ? IS NULL)
    `;

    db.query(
      jobSeekerQuery,
      [
        `%${search}%`,
        search,
        `%${email}%`,
        email,
        `%${firstName}%`,
        firstName,
        `%${lastName}%`,
        lastName,
      ],
      (err, jobSeekers) => {
        if (err) {
          return callback(err);
        }

        const jobSeekerPromises = jobSeekers.map((jobSeeker) => {
          return new Promise((resolve, reject) => {
            const jobSeekerId = jobSeeker.job_seeker_id;

            const educationQuery = `SELECT * FROM ${db_name}.education_job_seekers WHERE education_jobSeekerId = ?`;
            const experienceQuery = `SELECT * FROM ${db_name}.experience_job_seekers WHERE jobSeekerId = ?`;
            const referencesQuery = `SELECT * FROM ${db_name}.professionalreferences_job_seekers_id WHERE professionalreferencesjob_seekers_id = ?`;
            const resumeQuery = `SELECT * FROM ${db_name}.resumes WHERE job_seeker_id = ?`;

            db.query(educationQuery, [jobSeekerId], (err, educations) => {
              if (err) {
                return reject(err);
              }

              jobSeeker.education = educations;

              db.query(experienceQuery, [jobSeekerId], (err, experiences) => {
                if (err) {
                  return reject(err);
                }

                jobSeeker.experience = experiences;

                db.query(referencesQuery, [jobSeekerId], (err, references) => {
                  if (err) {
                    return reject(err);
                  }

                  jobSeeker.professionalReferences = references;

                  db.query(resumeQuery, [jobSeekerId], (err, resumes) => {
                    if (err) {
                      return reject(err);
                    }

                    jobSeeker.resumes = resumes;

                    resolve(jobSeeker);
                  });
                });
              });
            });
          });
        });

        Promise.all(jobSeekerPromises)
          .then((jobSeekersWithDetails) => {
            callback(null, jobSeekersWithDetails);
          })
          .catch((err) => {
            callback(err);
          });
      }
    );
  },
};

// Helper function to handle transaction rollback and connection release
function rollbackAndRelease(connection, err, callback) {
  connection.rollback(() => {
    connection.release();
    console.error("Transaction rolled back due to error:", err);
    callback(err);
  });
}

function updateRelatedTables(
  connection,
  id,
  education,
  experience,
  professionalReferences,
  callback
) {
  // Input validation
  if (!id) {
    return rollbackAndRelease(
      connection,
      new Error("Job seeker ID is required"),
      callback
    );
  }

  console.log("Starting to update related tables for job seeker ID:", id);
  console.log("Education data:", JSON.stringify(education));
  console.log("Experience data:", JSON.stringify(experience));
  console.log("References data:", JSON.stringify(professionalReferences));

  // Helper function to execute delete query with proper error handling
  const executeDelete = async (tableName, columnName) => {
    const query = `DELETE FROM ${db_name}.${tableName} WHERE ${columnName} = ?`;
    console.log(`Executing delete query for ${tableName}:`, query);

    return new Promise((resolve, reject) => {
      connection.query(query, [id], (err, result) => {
        if (err) {
          console.error(`Error deleting from ${tableName}:`, err);
          reject(err);
        } else {
          console.log(
            `Successfully deleted from ${tableName}. Rows affected:`,
            result.affectedRows
          );
          resolve(result);
        }
      });
    });
  };

  // Main execution flow using async/await
  (async () => {
    try {
      // Delete existing records
      await Promise.all([
        executeDelete("education_job_seekers", "education_jobSeekerId"),
        executeDelete("education_degrees", "education_id"),
        executeDelete("experience_job_seekers", "jobSeekerId"),
        executeDelete(
          "professionalreferences_job_seekers_id",
          "professionalreferencesjob_seekers_id"
        ),
      ]);

      // Insert new records
      await Promise.all([
        ...education.map((edu) => insertEducation(connection, id, edu)),
        ...experience.map((exp) => insertExperience(connection, id, exp)),
        ...professionalReferences.map((ref) =>
          insertReferences(connection, id, ref)
        ),
      ]);

      // Commit transaction
      connection.commit((err) => {
        if (err) {
          console.error("Error committing transaction:", err);
          return rollbackAndRelease(connection, err, callback);
        }
        console.log("Transaction committed successfully");
        connection.release();
        callback(null, {
          success: true,
          message: "Job Seeker and related tables updated successfully",
        });
      });
    } catch (err) {
      console.error("Error in updateRelatedTables:", err);
      return rollbackAndRelease(connection, err, callback);
    }
  })();
}

async function insertEducation(connection, id, edu) {
  if (!edu || !edu.institutionName) {
    console.warn("Skipping invalid education record:", edu);
    return Promise.resolve();
  }

  return new Promise((resolve, reject) => {
    // First insert the education record
    const eduQuery = `
      INSERT INTO ${db_name}.education_job_seekers 
      (education_jobSeekerId, institutionName, country, state, city) 
      VALUES (?, ?, ?, ?, ?)
    `;
    const eduValues = [
      id,
      edu.institutionName,
      edu.country,
      edu.state,
      edu.city,
    ];

    console.log("Inserting education record:", eduValues);
    connection.query(eduQuery, eduValues, async (err, result) => {
      if (err) {
        console.error("Error inserting education:", err);
        return reject(err);
      }

      const educationId = result.insertId;
      console.log("Education record inserted successfully, ID:", educationId);

      // Then insert the degrees if they exist
      if (edu.degrees && Array.isArray(edu.degrees)) {
        try {
          await Promise.all(
            edu.degrees.map((degree) =>
              insertDegree(connection, educationId, degree)
            )
          );
          resolve(result);
        } catch (degreeErr) {
          reject(degreeErr);
        }
      } else {
        resolve(result);
      }
    });
  });
}

async function insertDegree(connection, educationId, degree) {
  return new Promise((resolve, reject) => {
    const query = `
      INSERT INTO ${db_name}.education_degrees 
      (education_id, degree, education_completed, major, graduation_date, 
       additional_info, grade, out_of) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const values = [
      educationId,
      degree.degree,
      degree.educationCompleted,
      degree.major,
      degree.graduationDate,
      degree.additionalInfo,
      degree.grade,
      degree.outOf,
    ];

    console.log("Inserting degree record:", values);
    connection.query(query, values, (err, result) => {
      if (err) {
        console.error("Error inserting degree:", err);
        reject(err);
      } else {
        console.log("Degree record inserted successfully");
        resolve(result);
      }
    });
  });
}

async function insertExperience(connection, id, exp) {
  if (!exp || !exp.companyName) {
    console.warn("Skipping invalid experience record:", exp);
    return Promise.resolve();
  }

  return new Promise((resolve, reject) => {
    const query = `
      INSERT INTO ${db_name}.experience_job_seekers 
      (jobSeekerId, companyName, jobTitle, startDate, endDate, jobDescriptions, projects) 
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    const values = [
      id,
      exp.companyName,
      exp.jobTitle,
      exp.startDate,
      exp.endDate,
      exp.jobDescriptions,
      exp.projects,
    ];

    console.log("Inserting experience record:", values);
    connection.query(query, values, (err, result) => {
      if (err) {
        console.error("Error inserting experience:", err);
        reject(err);
      } else {
        console.log("Experience record inserted successfully");
        resolve(result);
      }
    });
  });
}

async function insertReferences(connection, id, ref) {
  if (!ref || !ref.name) {
    console.warn("Skipping invalid reference record:", ref);
    return Promise.resolve();
  }

  return new Promise((resolve, reject) => {
    const query = `
      INSERT INTO ${db_name}.professionalreferences_job_seekers_id 
      (professionalreferencesjob_seekers_id, name, companyName, phoneNumber, email, relationship) 
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    const values = [
      id,
      ref.name,
      ref.companyName,
      ref.phoneNumber,
      ref.email,
      ref.relationship,
    ];

    console.log("Inserting reference record:", values);
    connection.query(query, values, (err, result) => {
      if (err) {
        console.error("Error inserting reference:", err);
        reject(err);
      } else {
        console.log("Reference record inserted successfully");
        resolve(result);
      }
    });
  });
}

module.exports = JobSeeker;
