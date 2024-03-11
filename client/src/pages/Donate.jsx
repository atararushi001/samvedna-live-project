import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

const Donate = () => {
  const sectionRef1 = useRef(null);
  const sectionRef2 = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate");
          } else {
            entry.target.classList.remove("animate");
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px",
      }
    );

    if (sectionRef1.current) {
      observer.observe(sectionRef1.current);
    }

    if (sectionRef2.current) {
      observer.observe(sectionRef2.current);
    }

    const currentRef1 = sectionRef1.current;
    const currentRef2 = sectionRef2.current;

    return () => {
      if (currentRef1) {
        observer.unobserve(currentRef1);
      }

      if (currentRef2) {
        observer.unobserve(currentRef2);
      }
    };
  }, []);

  const listItemRef1 = useRef(null);
  const listItemRef2 = useRef(null);
  const listItemRef3 = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate");
          } else {
            entry.target.classList.remove("animate");
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px",
      }
    );

    if (listItemRef1.current) {
      observer.observe(listItemRef1.current);
    }

    if (listItemRef2.current) {
      observer.observe(listItemRef2.current);
    }

    if (listItemRef3.current) {
      observer.observe(listItemRef3.current);
    }

    const currentRef1 = listItemRef1.current;
    const currentRef2 = listItemRef2.current;
    const currentRef3 = listItemRef3.current;

    return () => {
      if (currentRef1) {
        observer.unobserve(currentRef1);
      }

      if (currentRef2) {
        observer.unobserve(currentRef2);
      }

      if (currentRef3) {
        observer.unobserve(currentRef3);
      }
    };
  }, []);

  return (
    <>
      <section className="donate">
        <h1>Donate</h1>
        <div className="container to-animate" ref={sectionRef1}>
          <p>
            <strong>
              &ldquo; Gratitude for Support: Building a Compassionate and
              Inclusive World &rdquo;
            </strong>
          </p>
          {/* <p className="donate-slogan">
            <span className="highlight">
              <strong>SAMVEDNA</strong> NEEDS
            </span>
            &nbsp;+&nbsp;<span className="highlight">AN EXPECTATION</span>
            &nbsp;=&nbsp;
            <span className="highlight">
              AN APPEAL for
              <strong>&nbsp;PERSONS WITH disABILITIES</strong>
            </span>
          </p> */}
          <p className="italic">
            At Samvedna, we&apos;re humbled by the unwavering support pouring in
            from businesses, institutions, and individuals. Your kindness is the
            cornerstone of our mission to uplift those with disabilities.
            It&apos;s through this collective effort—governmental and
            non-governmental—that we&apos;re able to provide essential social
            welfare services. With deep gratitude, we thank each and every one
            of you for your generous contributions. Your support isn&apos;t just
            funding; it&apos;s a lifeline, a beacon of hope for those in need.
            Together, we&apos;re not just changing lives; we&apos;re building a
            more compassionate and inclusive world, one act of kindness at a
            time.
          </p>
          <p>
            <strong>
              &ldquo;Together, hand in hand, we&apos;re forging a path toward a
              more inclusive and supportive society.&rdquo;
            </strong>
          </p>
          <a className="btn" href="#donate-now">
            Donate Now
          </a>
        </div>
      </section>

      <div className="container">
        <section id="donate-now" className="to-animate" ref={sectionRef2}>
          <h1>
            Support <span className="highlight-text">Our Cause Today!</span>
          </h1>
          <p>
            <strong>
              Transform Lives with Your Generosity: Donate to Samvedna Trust
            </strong>
          </p>
          <p>Dear Beloved Supporters,</p>
          <p>
            In the tapestry of humanity, there are threads of compassion that
            weave miracles. Today, we reach out to you, our cherished
            supporters, as we embark on a journey to illuminate the lives of the
            disABILITY community with hope, opportunity, and empowerment. At
            Samvedna Trust, our mission is to carve pathways to dignity and
            independence for Persons with disABILITY. We stand as guardians of
            dreams, advocates for change, and champions of inclusion. But our
            canvas is incomplete without the colors of your generosity.
          </p>
          <p>
            Your donation isn&apos;t just a financial contribution; it&apos;s a
            lifeline for those who dare to dream against the odds. It&apos;s a
            beacon of hope for individuals yearning for a chance to shine. With
            your support, we can continue to paint landscapes of opportunity and
            break barriers that confine the spirit. Consider the impact of your
            kindness: a job opportunity for a person with a disability, a
            platform for self-expression, a community united in compassion. Your
            donation is a symphony of possibility, a melody of transformation
            that echoes through generations.
          </p>
          <p>
            In the tapestry of humanity, threads of compassion weave miracles.
            Today, we reach out to you, our cherished supporters, on a journey
            to illuminate the lives of the disABILITY community. At Samvedna
            Trust, we carve pathways to dignity and independence for Persons
            with disABILITY. With your generosity, we paint landscapes of
            opportunity, breaking barriers and fostering self-expression. Your
            donation is a lifeline, a beacon of hope that sparks transformation.
            Let&apos;s envision a world where ability knows no bounds, diversity
            is celebrated, and every individual is valued.{" "}
          </p>
          <p>
            Thank you for opening your heart and standing with us in solidarity.
            Your support is the cornerstone of our mission, and with it, we can
            build a future brimming with promise and opportunity.
          </p>
          <p>
            <strong>
              Together, we can light up the sky with the brilliance of human
              potential.
            </strong>
          </p>
          <p className="highlight">
            <strong>
              &ldquo;For taxpayers, all donations to us qualify for a 50%
              exemption from income tax under the provision of Section 80G of
              the Income Tax Act of India&rdquo;
            </strong>
          </p>
          <p>There are several ways you can contribute to our cause:</p>
          <ol>
            <li
              ref={listItemRef1}
              className="donate-now-list-item flex-list to-animate"
            >
              <Link to="https://www.payumoney.com/paybypayumoney/#/A5CFF1F49EB0F1000EFE26FF3757C90B">
                Secure Online Donation
              </Link>
            </li>
            <li ref={listItemRef2} className="donate-now-list-item to-animate">
              You can also choose to make a direct bank transfer to our account.
              Details of our Bank is given below
            </li>
            <li ref={listItemRef3} className="donate-now-list-item to-animate">
              In addition to monetary support, we also welcome in-kind donations
              such as equipment, resources, and materials that can aid in our
              programs and activities.
            </li>
          </ol>

          <table>
            <thead>
              <tr>
                <th colSpan="2">
                  <h2>BANK DETAILS</h2>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Our Bank</td>
                <td>Utkarsh Small Finance Bank</td>
              </tr>
              <tr>
                <td>Branch</td>
                <td>Gotri</td>
              </tr>
              <tr>
                <td>Account no.</td>
                <td>1534010000000229</td>
              </tr>
              <tr>
                <td>IFSC code</td>
                <td>UTKS0001534</td>
              </tr>
            </tbody>
          </table>
        </section>

        <section className="support-us">
          <h1>
            Support <span className="highlight-text">Us</span>
          </h1>
          <ol>
            <li className="donate-now-list-item">
              Contribute tricycles, wheelchairs, crutches, walking tripods,
              folding sticks, hearing aids, and self-employment tools to enhance
              independence and mobility.
            </li>
            <li className="donate-now-list-item">
              Your old and unused items such as computers, furniture,
              stationery, clothing, mobile phones, electronics, kitchen
              equipment, toys, and sports gear can significantly impact the
              lives of those in need. Your donations pave the way for a brighter
              future and improved lifestyles.
            </li>
          </ol>
        </section>

        <section className="volunteer-contributions">
          <h1>
            Volunteer <span className="highlight-text">Contributions</span>
          </h1>
          <ol>
            <li className="donate-now-list-item">
              Conduct health check-up and awareness camps to promote well-being
              among vulnerable communities.
            </li>
            <li className="donate-now-list-item">
              Advocate for our empowerment projects among your social circle,
              promoting inclusion and opportunities for all.
            </li>
            <li className="donate-now-list-item">
              Stand up for the rights of persons with disabilities, fostering a
              more inclusive and equitable society.
            </li>
            <li className="donate-now-list-item">
              Encourage corporate social responsibility initiatives within your
              organization, organizing fundraisers, and promoting employee
              involvement in social causes.
            </li>
            <li className="donate-now-list-item">
              Assist individuals with disabilities in finding employment or
              pursuing self-employment ventures, fostering economic independence
              and empowerment.
            </li>
            <li className="donate-now-list-item">
              Share joyous occasions such as birthdays and anniversaries with
              the community, spreading happiness and solidarity.
            </li>
          </ol>
        </section>

        <section className="social-responsibility">
          <h1>
            Corporate Social
            <span className="highlight-text"> Responsibility</span>
          </h1>
          <ol>
            <li className="donate-now-list-item">
              Encourage employees to contribute to social causes, fostering a
              culture of giving within the organization.
            </li>
            <li className="donate-now-list-item">
              Organize events to raise funds for our projects and initiatives,
              engaging stakeholders in philanthropic endeavors.
            </li>
            <li className="donate-now-list-item">
              Support our mission through financial donations, making a direct
              impact on the lives of individuals with disabilities.
            </li>
            <li className="donate-now-list-item">
              Provide space in schools, colleges, offices, or other venues for
              training sessions, workshops, and medical camps.
            </li>
            <li className="donate-now-list-item">
              Allocate space within your premises for conducting medical camps,
              promoting health and well-being in the community.
            </li>
            <li className="donate-now-list-item">
              Offer space for special classes such as career guidance, computer
              literacy, and art workshops, empowering individuals with valuable
              skills for the future.
            </li>
          </ol>
        </section>

        <section className="resource-assistance">
          <h1>
            Resource Mobilization
            <span className="highlight-text"> Assistance</span>
          </h1>
          <ol style={{ width: "100%" }}>
            <li className="donate-now-list-item">
              Help identify organizations willing to provide employment
              opportunities to persons with disabilities.
            </li>
            <li className="donate-now-list-item">
              Connect us with potential sponsors and donors to support our
              initiatives.
            </li>
            <li className="donate-now-list-item">
              Assist in identifying and securing support from trusts and
              foundations aligned with our mission.
            </li>
            <li className="donate-now-list-item">
              Explore partnerships with brands willing to donate a portion of
              their profits to support our cause.
            </li>
            <li className="donate-now-list-item">
              Investigate opportunities for collaboration with banks to
              facilitate donations through credit/debit card rewards.
            </li>
            <li className="donate-now-list-item">
              Support in establishing and operating a charity shop to generate
              funds for our programs.
            </li>
            <li className="donate-now-list-item">
              Help procure self-employment kits to empower individuals with
              disabilities to start their own businesses.
            </li>
            <li className="donate-now-list-item">
              Identify potential donors eligible for tax exemptions on their
              contributions to our organization.
            </li>
            <li className="donate-now-list-item">
              Assist in identifying and engaging new donors to expand our
              support base.
            </li>
          </ol>
        </section>
      </div>
    </>
  );
};

export default Donate;
