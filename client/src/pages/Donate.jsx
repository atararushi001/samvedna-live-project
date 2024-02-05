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
            SAMVEDNA <strong>SERVE</strong> with <strong>SINCERITY</strong>{" "}
            giving <strong>SACRIFICE</strong> needs your{" "}
            <strong>SUPPORT</strong> which lead us to <strong>SUCCESS</strong>
          </p>
          <p className="donate-slogan">
            <span className="highlight">
              <strong>SAMVEDNA</strong> NEEDS
            </span>
            &nbsp;+&nbsp;<span className="highlight">AN EXPECTATION</span>
            &nbsp;=&nbsp;
            <span className="highlight">
              AN APPEAL for
              <strong>&nbsp;PERSONS WITH disABILITIES</strong>
            </span>
          </p>
          <p className="italic">
            &ldquo;Samvedna acknowledges the crucial support received from
            businesses, institutions, industrial units, corporations, and
            individuals in its mission to integrate and uplift people with
            disabilities. The organization highlights the collaborative efforts
            that have facilitated social welfare services, emphasizing the
            significance of both governmental and non-governmental
            contributions. Samvedna expresses gratitude to those who have
            generously supported their cause, recognizing the collective impact
            achieved through collaborative efforts for the socio-economic
            betterment of individuals with disabilities. The project emphasizes
            the importance of working together to create a more inclusive and
            supportive society.&rdquo;
          </p>
          <a className="btn" href="#donate-now">
            Donate Now
          </a>
        </div>
      </section>

      <div className="container">
        <section id="donate-now" className="to-animate" ref={sectionRef2}>
          <h1>
            Support <span className="highlight-text">Samvedna</span>
          </h1>
          <p>
            With an intention to continue the present as well as new upcoming
            events related to employment, self-employment & matrimonial which
            are the utmost basic need of “Persons with disABILITY Community” and
            simultaneously other social welfare related activities, programs,
            seminars etc. “SAMVEDNA” once again looks forward to its esteemed
            donors, patrons and genius person like you to be generous in lending
            support in the form of financial donation. You can donate by the
            following methods:
          </p>
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
              Cheque or Demand Draft in favour of SAMVEDNA disABLED PERSONS
              SOCIAL WELFARE TRUST, VADODARA and send it at A/173, Silver Leaf
              Bungalows, Behind Bharat Petrol Pump, Nr. Revashray,
              Waghodia-Dabhoi Ring Road, Soma Talav Crossing, Vadodara -390 025
              (Gujarat) India.
            </li>
            <li ref={listItemRef3} className="donate-now-list-item to-animate">
              Direct NEFT/RTGS/IMPS bank transfer
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
                <td>State Bank Of India</td>
              </tr>
              <tr>
                <td>Branch</td>
                <td>
                  Nakshatra Building, Sangam Cross Road, Harni Road, Vadodara -
                  390 018 (Gujarat) India.
                </td>
              </tr>
              <tr>
                <td>Branch Code</td>
                <td>04725</td>
              </tr>
              <tr>
                <td>Account no.</td>
                <td>31690284449</td>
              </tr>
              <tr>
                <td>IFSC code</td>
                <td>SBIN0004725</td>
              </tr>
            </tbody>
          </table>
        </section>
      </div>
    </>
  );
};

export default Donate;
