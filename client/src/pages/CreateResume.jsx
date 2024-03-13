import { useState } from "react";

const CreateResume = () => {
  const [formData, setFormData] = useState({
    resumeName: "",
    firstName: "",
    lastName: "",
    suffix: "",
    email: "",
    phone: "",
    website: "",
    linkedin: "",
    country: "",
    state: "",
    city: "",
    postalCode: "",
    summary: "",
    objective: "",
    employers: [
      {
        employerName: "",
        positions: [
          {
            positionTitle: "",
            startDate: "",
            endDate: "",
            isCurrentPosition: false,
            jobDescription: "",
          },
        ],
      },
    ],
    education: [
      {
        institutionName: "",
        country: "",
        state: "",
        city: "",
        degrees: [
          {
            degree: "",
            educationCompleted: "",
            major: "",
            graduationDate: "",
            additionalInfo: "",
            grade: "",
            outOf: "",
          },
        ],
      },
    ],
    militaryStatus: "",
    militaryAdditionalInfo: "",
    branches: [
      {
        branch: "",
        unit: "",
        beginningRank: "",
        endingRank: "",
        startDate: "",
        endDate: "",
        areaOfExpertise: "",
        recognition: "",
      },
    ],
    workAuthorization: "",
    mostRecentPay: "",
    currency: "",
    paytime: "",
    highestEducation: "",
    mostRecentCareer: "",
    mostRecentIndustry: "",
    mostRecentJobTitle: "",
    languages: [],
    militaryExperience: "",
    govermentClearance: "",
    desiredJobType: "",
    desiredPay: "",
    desiredCurrency: "",
    desiredPaytime: "",
    desiredCommute: "",
    desiredTravel: "",
    additionalPreferences: "",
    relocation: "",
    firstRelocation: [
      {
        country: "",
        state: "",
        city: "",
        postalCode: "",
      },
    ],
    secondRelocation: [
      {
        country: "",
        state: "",
        city: "",
        postalCode: "",
      },
    ],
    thirdRelocation: [
      {
        country: "",
        state: "",
        city: "",
        postalCode: "",
      },
    ],
    overallAdditionalInfo: "",
    published: false,
  });

  return (
    <div className="container">
      <section className="build-resume">
        <h1>
          Build Your <span className="highlight-text">Resume</span>
        </h1>
        <p>
          Complete your resume by filling in each section. Employers will find
          your resume using the information you enter below. The more
          information you fill in, the more searchable your resume becomes.
        </p>
        <form className="build-resume-form">
          <fieldset>
            <legend>Resume Setting</legend>
            <p>
              This is for your own reference. It will not be visible to anyone.
            </p>
            <input
              type="text"
              name="resumeName"
              id="resumeName"
              placeholder="Resume Name"
            />
          </fieldset>
        </form>
      </section>
    </div>
  );
};

export default CreateResume;
