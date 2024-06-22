const db = require("../config/db.config");
const db_name = process.env.MYSQL_DATABASE;

const JobSeeker = {
  getAll: (callback) => {
    db.query(`SELECT * FROM ${db_name}.job_seekers`, callback);
  },
  create: (newJobSeeker, callback) => {
    console.log(newJobSeeker);
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

    db.query(
      `INSERT INTO ${db_name}.job_seekers (email, username, password, name, lastName, dob, gender, permanentAddress, currentAddress, city, state, postalCode, country, contactNumber, whatsappNumber, jobAlerts, homePhone, addHomePhone, qualification, educationSpecialization, experienceAndAppliance, yesNoQuestion, twoWheeler, threeWheeler, car, disabilityPercentage, specializationInDisability) VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
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
      ],
      callback
    );
  },
  update: (id, newJobSeeker, callback) => {
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

    db.query(
      `UPDATE ${db_name}.job_seekers SET email = ?, username = ?, password = ?, name = ?, lastName = ?, dob = ?, gender = ?, permanentAddress = ?, currentAddress = ?, city = ?, state = ?, postalCode = ?, country = ?, contactNumber = ?, whatsappNumber = ?, jobAlerts = ?, homePhone = ?, addHomePhone = ?, qualification = ?, educationSpecialization = ?, experienceAndAppliance = ?, yesNoQuestion = ?, twoWheeler = ?, threeWheeler = ?, car = ?, disabilityPercentage = ?, specializationInDisability = ? WHERE job_seeker_id = ?`,
      [
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
      ],
      (err, result) => {
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
      }
    );
  },
  getByEmail: (email, callback) => {
    db.query(
      `SELECT * FROM ${db_name}.job_seekers WHERE email = ?`,
      [email],
      callback
    );
  },
  getById: (id, callback) => {
    db.query(
      `SELECT * FROM ${db_name}.job_seekers WHERE job_seeker_id = ?`,
      [id],
      callback
    );
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
              `INSERT INTO ${db_name}.education (resume_id, institutionName) VALUES (?, ?)`,
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
            db.query("ROLLBACK", (err, result) => {
              callback(err, null);
            });
            return;
          }
          const deleteEmployersQuery = `DELETE FROM ${db_name}.employers WHERE resume_id = ?`;
          const deleteEducationQuery = `DELETE FROM ${db_name}.education WHERE resume_id = ?`;
          const deleteBranchesQuery = `DELETE FROM ${db_name}.branches WHERE resume_id = ?`;

          db.query(deleteEmployersQuery, [resumeId], (err, result) => {
            if (err) {
              db.query("ROLLBACK", (err, result) => {
                callback(err, null);
              });
              return;
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
                        db.query("ROLLBACK", (err, result) => {
                          callback(err, null);
                        });
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
};

module.exports = JobSeeker;
