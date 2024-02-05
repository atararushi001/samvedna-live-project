import { useState } from "react";

const SelfEmploymentRegister = () => {
  const [formData, setFormData] = useState({
    name: "",
    disabilityType: "",
    percentage: "",
    education: "",
    companyName: "",
    companyType: "",
    officeAddress: "",
    contactNumber: "",
    email: "",
    professionType: "",
    description: "",
    productDetails: [],
    experience: "",
    assistanceNedeed: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("product")) {
      const index = parseInt(name.replace("product", ""), 10);
      const updatedProductDetails = [...formData.productDetails];
      updatedProductDetails[index] = value;

      setFormData((prevData) => ({
        ...prevData,
        productDetails: updatedProductDetails,
      }));
    } else {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const addProductDetail = () => {
    setFormData((prevData) => ({
      ...prevData,
      productDetails: [...prevData.productDetails, ""],
    }));
  };

  const removeProductDetail = (index) => {
    setFormData((prevData) => ({
      ...prevData,
      productDetails: prevData.productDetails.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your form submission logic here or send data to a backend API
    console.log(formData);
  };
  return (
    <>
      <section id="quotes">
        <div className="container">
          <blockquote>
            <p>
              &ldquo;NEVER GIVE UP! No one will know that we are the HIGH
              POTENTIAL person until we make an IMPACT on other people.&rdquo;
              <br /> -<span className="highlight-text">Andrew Parengkuan</span>
            </p>
            <p>
              &ldquo;If alphabet &apos;O&apos; stands for Opportunity, its
              absent in yesterday, once in today, and thrice in tomorrow. So
              theres always a new opportunity waiting for you tomorrow.&rdquo;{" "}
              <br />- <span className="highlight-text">Anonymous</span>
            </p>
          </blockquote>

          <p className="sub-text">
            People with disABILITY face challenges and limited opportunities.
            Self-employment and small businesses are crucial for their economic
            independence and social upliftment.
          </p>
          <p className="sub-text">
            SAMVEDNA supports and guides unemployed Persons with disABILITY
            towards self-employment, providing information and resources for
            small business ventures.
          </p>
        </div>
      </section>
      <div className="container">
        <section id="financial-support">
          <h1>Financial Support for Self-Employment Ventures</h1>
          <p>
            <a
              href="https://www.nhfdc.nic.in/"
              target="_blank"
              rel="noreferrer"
            >
              The National Handicapped and Finance Development Corporation
            </a>{" "}
            has been providing loans on concessional terms for undertaking
            self-employment ventures by the persons with disabilities through
            state channelizing agencies.
          </p>
          <ol>
            <li className="financial-support-list-item">
              Schemes Implemented through State Channelising Agencies (SCA) &
              Nationalised Bank
              <a
                href="https://nhfdc.nic.in/schemes/schemes-implemented-through-scas-nationalised-banks"
                target="_blank"
                rel="noreferrer"
              >
                Know More
              </a>
            </li>
            <li className="financial-support-list-item">
              <a
                href="https://nhfdc.nic.in/site/mcs.pdf"
                target="_blank"
                rel="noreferrer"
              >
                Know More
              </a>
              Micro Financing Scheme
            </li>
            <li className="financial-support-list-item">
              Schemes for Parent&aspo;s Association of mentally retarded persons
              <a
                href="https://nhfdc.nic.in/site/parents_schemes.aspx"
                target="_blank"
                rel="noreferrer"
              >
                Know More
              </a>
            </li>
            <li className="financial-support-list-item">
              <a
                href="https://nhfdc.nic.in/how-to-obtain-loan"
                target="_blank"
                rel="noreferrer"
              >
                Procedure for obtaining loan.
              </a>
            </li>
          </ol>
        </section>

        <section id="self-employed-professional-support">
          <h1>
            <span className="highlight-text">SELF EMPLOYED PROFESSIONAL</span> -
            A SUPPORT
          </h1>
          <p>
            If you are a self-employed Person with disABILITY in various
            professions, submit your form to get opportunities for engagement,
            hiring, job work, and support from the community.
          </p>

          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <select
              name="disabilityType"
              value={formData.disabilityType}
              onChange={handleChange}
              required
            >
              <option value="" disabled>
                Select Type of Disability
              </option>
              <option value="Blindness">Blindness</option>
              <option value="Low vision">Low vision</option>
              <option value="Leprosy cured">Leprosy cured</option>
              <option value="Hearing impairment">Hearing impairment</option>
              <option value="Locomotor disability">Locomotor disability</option>
              <option value="Mental Retardation">Mental Retardation</option>
              <option value="Mental illness">Mental illness</option>
            </select>
            <select
              name="percentage"
              value={formData.percentage}
              onChange={handleChange}
              required
            >
              <option value="" disabled>
                Select Percentage of Disability
              </option>
              <option value="40-45">40-45</option>
              <option value="45-50">45-50</option>
              <option value="50-55">50-55</option>
              <option value="55-60">55-60</option>
              <option value="60-65">60-65</option>
              <option value="65-70">65-70</option>
              <option value="70-75">70-75</option>
              <option value="75-80">75-80</option>
              <option value="80-85">80-85</option>
              <option value="85-90">85-90</option>
              <option value="90-95">90-95</option>
              <option value="95-100">95-100</option>
            </select>
            <input
              type="text"
              name="education"
              placeholder="Educational Qualification"
              value={formData.education}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="companyName"
              placeholder="Name of your Firm/Shop/Company"
              value={formData.companyName}
              onChange={handleChange}
              required
            />
            <select
              name="companyType"
              value={formData.companyType}
              onChange={handleChange}
              required
            >
              <option value="" disabled>
                Select Type of your Company
              </option>
              <option value="Manufacturer">Manufacturer</option>
              <option value="Dealer">Dealer</option>
              <option value="Distributor">Distributor</option>
              <option value="Wholesaler">Wholesaler</option>
              <option value="Retailer">Retailer</option>
              <option value="Self-employed">Self-employed</option>
            </select>
            <input
              type="text"
              name="officeAddress"
              placeholder="Office Address"
              value={formData.officeAddress}
              onChange={handleChange}
              required
            />
            <input
              type="tel"
              name="contactNumber"
              placeholder="Contact Number"
              value={formData.contactNumber}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <select
              name="professionType"
              id="professionType"
              required
              value={formData.professionType}
              onChange={handleChange}
            >
              <option value="1">1</option>
            </select>

            <textarea
              name="description"
              id="description"
              cols="30"
              rows="10"
              placeholder="Describe Your Profession (in one sentence)"
              value={formData.description}
              onChange={handleChange}
            ></textarea>

            <label htmlFor="productDetails" style={{ textAlign: "left" }}>
              Add Product Details (If Any)
            </label>
            {formData.productDetails.map((detail, index) => (
              <div
                name="productDetails"
                key={index}
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: "1rem",
                }}
              >
                <input
                  type="text"
                  name={`product${index}`}
                  placeholder={`Product Detail ${index + 1}`}
                  value={detail}
                  required
                  onChange={handleChange}
                />
                <button
                  type="button"
                  className="btn btn-delete"
                  onClick={() => removeProductDetail(index)}
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              className="btn btn-outline"
              onClick={addProductDetail}
            >
              Add Field
            </button>

            <input
              type="text"
              name="experience"
              id="experience"
              placeholder="Experience in Profession"
              required
              value={formData.experience}
              onChange={handleChange}
            />

            <input
              type="text"
              name="assistanceNedeed"
              id="assistanceNedeed"
              placeholder="Assistance nedeed for Self-Employment"
              required
              value={formData.assistanceNedeed}
              onChange={handleChange}
            />

            <button type="submit" className="btn btn-full">
              Submit
            </button>
          </form>
        </section>
      </div>
    </>
  );
};

export default SelfEmploymentRegister;
