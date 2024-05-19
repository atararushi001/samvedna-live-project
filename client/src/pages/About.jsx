import { useEffect, useRef } from "react";

import Default from "../assets/images/Team/default.png";
import Tarulatta from "../assets/images/Team/Core/Tarulata Patel.jpg";

const About = () => {
  const sectionRef1 = useRef(null);
  const sectionRef2 = useRef(null);
  const sectionRef3 = useRef(null);

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

    if (sectionRef3.current) {
      observer.observe(sectionRef3.current);
    }

    const currentRef1 = sectionRef1.current;
    const currentRef2 = sectionRef2.current;
    const currentRef3 = sectionRef2.current;

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

  const listItemRef1 = useRef(null);
  const listItemRef2 = useRef(null);
  const listItemRef3 = useRef(null);
  const listItemRef4 = useRef(null);
  const listItemRef5 = useRef(null);

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

    if (listItemRef4.current) {
      observer.observe(listItemRef4.current);
    }

    if (listItemRef5.current) {
      observer.observe(listItemRef5.current);
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
    <div className="container">
      <section className="contact to-animate" ref={sectionRef1}>
        <img src={Tarulatta} alt="Late Tarulatta Patel" />
        <h2>Late Tarulatta Patel</h2>
        <h4>(Ex Founder, Managing Trustee & President)</h4>
        <h2>Honoring the Legacy of Our Beloved Managing Trustee</h2>
        <p>
          We deeply mourn the passing of our beloved Managing Trustee, who was
          the driving force behind the inception and success of our NGO. Her
          visionary leadership, unwavering dedication, and invaluable
          contributions have left an indelible mark on our organization and the
          lives of countless individuals with disabilities. Her passion for
          empowering PWDs through employment initiatives has been instrumental
          in shaping our mission and guiding our efforts. We honor her legacy by
          continuing to uphold the values and principles she instilled in us,
          and we remain committed to fulfilling her vision of creating a more
          inclusive and equitable society.
        </p>
      </section>
      <section className="contact-persons">
        <h1>Contact Persons</h1>
        <div className="persons">
          <div className="person to-animate" ref={listItemRef1}>
            <img src={Default} alt="Mayank Patel" />
            <h3>
              MAYANK PATEL
              <span className="person-title">
                (Managing Trustee & President)
              </span>
            </h3>
          </div>
          <div className="person to-animate" ref={listItemRef2}>
            <img src={Default} alt="Sagar Patel" />
            <h3>
              SAGAR PATEL
              <span className="person-title">(Trustee & Secretary)</span>
            </h3>
          </div>
          <div className="person to-animate" ref={listItemRef3}>
            <img src={Default} alt="Sagar Patel" />
            <h3>
              RASHESH SHASTRI
              <span className="person-title">(Trustee & Treasurer)</span>
            </h3>
          </div>
          <div className="person to-animate" ref={listItemRef4}>
            <img src={Default} alt="Sagar Patel" />
            <h3>
              SARITA SINHA
              <span className="person-title">(Trustee & Joint Secretary)</span>
            </h3>
          </div>
          <div className="person to-animate" ref={listItemRef5}>
            <img src={Default} alt="Sagar Patel" />
            <h3>
              AMIT PATEL
              <span className="person-title">(Trustee & Joint Secretary)</span>
            </h3>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
