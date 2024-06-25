const db = require("../config/db.config");
const db_name = process.env.MYSQL_DATABASE;

const Recruiter = {
  getAll: (callback) => {
    db.query(`SELECT * FROM ${db_name}.recruiters`, callback);
  },
  getAllJobs: (id, callback) => {
    db.query(
      `SELECT * FROM ${db_name}.job WHERE recruiter_id = ?`,
      [id],
      callback
    );
  },
  create: (newRecruiter, callback) => {
    const {
      name,
      email,
      password,
      company,
      designation,
      contactNumber,
      city,
      state,
      country,
      profilePicture,
    } = newRecruiter;

    db.query(
      `INSERT INTO ${db_name}.recruiters (profilePicture, name, email, password, company, designation, contact, city, state, country) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        profilePicture,
        name,
        email,
        password,
        company,
        designation,
        contactNumber,
        city,
        state,
        country,
      ],
      callback
    );
  },
  getByEmail: (email, callback) => {
    db.query(
      `SELECT * FROM ${db_name}.recruiters WHERE email = ?`,
      [email],
      callback
    );
  },
  getById: (id, callback) => {
    db.query(
      `SELECT * FROM ${db_name}.recruiters WHERE id = ?`,
      [id],
      callback
    );
  },
  update: (id, recruiter, callback) => {
    const {
      name,
      email,
      company,
      password,
      designation,
      contactNumber,
      city,
      state,
      country,
    } = recruiter;

    let query = "";

    if (password) {
      query = `UPDATE ${db_name}.recruiters SET name = ?, email = ?, password = ?, company = ?, designation = ?, contact = ?, city = ?, state = ?, country = ? WHERE recruiters_id = ?`;
    } else {
      query = `UPDATE ${db_name}.recruiters SET name = ?, email = ?, company = ?, designation = ?, contact = ?, city = ?, state = ?, country = ? WHERE recruiters_id = ?`;
    }

    db.query(
      query,
      [
        name,
        email,
        password,
        company,
        designation,
        contactNumber,
        city,
        state,
        country,
        id,
      ],
      callback
    );
  },
  delete: (id, callback) => {
    db.query(`DELETE FROM ${db_name}.recruiters WHERE id = ?`, [id], callback);
  },
  postJob: (job, callback) => {
    const {
      recruiterId,
      companyName,
      website,
      natureOfBusiness,
      country,
      state,
      city,
      fax,
      areaCode,
      landline,
      mobile,
      email,
      employerName,
      companyDescription,
      jobDesignation,
      industryCategory,
      jobTitle,
      jobType,
      dutyDescription,
      jobDuration,
      minimumEducation,
      minimumExperience,
      salaryMin,
      salaryMax,
      workplaceType,
      placeOfWork,
      ageLimit,
      womenEligible,
      workingHoursFrom,
      workingHoursTo,
      vacanciesRegular,
      vacanciesTemporary,
      resumesToBeSent,
      resumeEmail,
      resumeWebsite,
      interviewDetailsDate,
      interviewDetailsTime,
      interviewDetailsAptitudeTest,
      interviewDetailsTechnicalTest,
      interviewDetailsGroupDiscussion,
      interviewDetailsPersonalInterview,
      interviewDetailsTopics,
      interviewDetailsContactPerson,
      disabilityInfoType,
      disabilityInfoPercentage,
      disabilityInfoAidOrAppliance,
      ownVehiclePreferred,
      conveyanceProvided,
      conveyanceType,
      otherInformation,
      currentDate,
    } = job;

    db.query(
      `INSERT INTO ${db_name}.job (recruiter_id, companyName, website, natureOfBusiness, country, state, city, fax, areaCode, landline, mobile, email, employerName, companyDescription, jobDesignation, industryCategory, jobTitle, jobType, dutyDescription, jobDuration, minimumEducation, minimumExperience, salaryMin, salaryMax, workplaceType, placeOfWork, ageLimit, womenEligible, workingHoursFrom, workingHoursTo, vacanciesRegular, vacanciesTemporary, resumesToBeSent, resumeEmail, resumeWebsite, interviewDetailsDate, interviewDetailsTime, interviewDetailsAptitudeTest, interviewDetailsTechnicalTest, interviewDetailsGroupDiscussion, interviewDetailsPersonalInterview, interviewDetailsTopics, interviewDetailsContactPerson, disabilityInfoType, disabilityInfoPercentage, disabilityInfoAidOrAppliance, ownVehiclePreferred, conveyanceProvided, conveyanceType, otherInformation, postedOn) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,? )`,
      [
        recruiterId,
        companyName,
        website,
        natureOfBusiness,
        country,
        state,
        city,
        fax,
        areaCode,
        landline,
        mobile,
        email,
        employerName,
        companyDescription,
        jobDesignation,
        industryCategory,
        jobTitle,
        jobType,
        dutyDescription,
        jobDuration,
        minimumEducation,
        minimumExperience,
        salaryMin,
        salaryMax,
        workplaceType,
        placeOfWork,
        ageLimit,
        womenEligible,
        workingHoursFrom,
        workingHoursTo,
        vacanciesRegular,
        vacanciesTemporary,
        resumesToBeSent,
        resumeEmail,
        resumeWebsite,
        interviewDetailsDate,
        interviewDetailsTime,
        interviewDetailsAptitudeTest,
        interviewDetailsTechnicalTest,
        interviewDetailsGroupDiscussion,
        interviewDetailsPersonalInterview,
        interviewDetailsTopics,
        interviewDetailsContactPerson,
        disabilityInfoType,
        disabilityInfoPercentage,
        disabilityInfoAidOrAppliance,
        ownVehiclePreferred,
        conveyanceProvided,
        conveyanceType,
        otherInformation,
        currentDate,
      ],
      callback
    );
  },
  updateJob: (id, job, callback) => {
    const {
      recruiterId,
      companyName,
      website,
      natureOfBusiness,
      country,
      state,
      city,
      fax,
      areaCode,
      landline,
      mobile,
      email,
      employerName,
      companyDescription,
      jobDesignation,
      industryCategory,
      jobTitle,
      jobType,
      dutyDescription,
      jobDuration,
      minimumEducation,
      minimumExperience,
      salaryMin,
      salaryMax,
      workplaceType,
      placeOfWork,
      ageLimit,
      womenEligible,
      workingHoursFrom,
      workingHoursTo,
      vacanciesRegular,
      vacanciesTemporary,
      resumesToBeSent,
      resumeEmail,
      resumeWebsite,
      interviewDetailsDate,
      interviewDetailsTime,
      interviewDetailsAptitudeTest,
      interviewDetailsTechnicalTest,
      interviewDetailsGroupDiscussion,
      interviewDetailsPersonalInterview,
      interviewDetailsTopics,
      interviewDetailsContactPerson,
      disabilityInfoType,
      disabilityInfoPercentage,
      disabilityInfoAidOrAppliance,
      ownVehiclePreferred,
      conveyanceProvided,
      conveyanceType,
      otherInformation,
    } = job;

    db.query(
      `UPDATE ${db_name}.job SET recruiter_id = ?, companyName = ?, website = ?, natureOfBusiness = ?, country = ?, state = ?, city = ?, fax = ?, areaCode = ?, landline = ?, mobile = ?, email = ?, employerName = ?, companyDescription = ?, jobDesignation = ?, industryCategory = ?, jobTitle = ?, jobType = ?, dutyDescription = ?, jobDuration = ?, minimumEducation = ?, minimumExperience = ?, salaryMin = ?, salaryMax = ?, workplaceType = ?, placeOfWork = ?, ageLimit = ?, womenEligible = ?, workingHoursFrom = ?, workingHoursTo = ?, vacanciesRegular = ?, vacanciesTemporary = ?, resumesToBeSent = ?, resumeEmail = ?, resumeWebsite = ?, interviewDetailsDate = ?, interviewDetailsTime = ?, interviewDetailsAptitudeTest = ?, interviewDetailsTechnicalTest = ?, interviewDetailsGroupDiscussion = ?, interviewDetailsPersonalInterview = ?, interviewDetailsTopics = ?, interviewDetailsContactPerson = ?, disabilityInfoType = ?, disabilityInfoPercentage = ?, disabilityInfoAidOrAppliance = ?, ownVehiclePreferred = ?, conveyanceProvided = ?, conveyanceType = ?, otherInformation = ? WHERE job_id = ?`,
      [
        recruiterId,
        companyName,
        website,
        natureOfBusiness,
        country,
        state,
        city,
        fax,
        areaCode,
        landline,
        mobile,
        email,
        employerName,
        companyDescription,
        jobDesignation,
        industryCategory,
        jobTitle,
        jobType,
        dutyDescription,
        jobDuration,
        minimumEducation,
        minimumExperience,
        salaryMin,
        salaryMax,
        workplaceType,
        placeOfWork,
        ageLimit,
        womenEligible,
        workingHoursFrom,
        workingHoursTo,
        vacanciesRegular,
        vacanciesTemporary,
        resumesToBeSent,
        resumeEmail,
        resumeWebsite,
        interviewDetailsDate,
        interviewDetailsTime,
        interviewDetailsAptitudeTest,
        interviewDetailsTechnicalTest,
        interviewDetailsGroupDiscussion,
        interviewDetailsPersonalInterview,
        interviewDetailsTopics,
        interviewDetailsContactPerson,
        disabilityInfoType,
        disabilityInfoPercentage,
        disabilityInfoAidOrAppliance,
        ownVehiclePreferred,
        conveyanceProvided,
        conveyanceType,
        otherInformation,
        id,
      ],
      callback
    );
  },
  deleteJob: (id, callback) => {
    db.query(`DELETE FROM ${db_name}.job WHERE job_id = ?`, [id], callback);
  },
  getJobById: (id, callback) => {
    db.query(`SELECT * FROM ${db_name}.job WHERE job_id = ?`, [id], callback);
  },
  changeStatus: (id, callback) => {
    db.query(
      `UPDATE ${db_name}.job SET jobStatus = 1 - jobStatus WHERE job_id = ?`,
      [id],
      callback
    );
  },
  getAllResumes: (callback) => {
    db.query(`SELECT * FROM ${db_name}.resumes WHERE published = 1`, callback);
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
};

module.exports = Recruiter;
