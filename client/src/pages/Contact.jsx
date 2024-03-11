import Tarulata from "../assets/images/Team/Core/Tarulata Patel.jpg";
import Mayank from "../assets/images/Team/Core/Mayank Patel.jpg";
import Sagar from "../assets/images/Team/Management/Sagar Patel.jpg";

import { useState, useEffect, useRef } from "react";
import { toast } from "react-toastify";

const API = import.meta.env.VITE_API_URL;

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact: "",
    address: "",
    message: "",
  });

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

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = new FormData();

    for (let key in formData) {
      data.append(key, formData[key]);
    }

    fetch(`${API}/controllers/contactForm.php`, {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          toast.success(data.message);
          setFormData({
            name: "",
            email: "",
            contact: "",
            address: "",
            message: "",
          });
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="container">
      <section className="contact to-animate" ref={sectionRef1}>
        <h1>Contact Information</h1>
        <p>
          We at <strong>SAMVEDNA</strong>, a social welfare trust for{" "}
          <strong>disABLED&nbsp;</strong>
          persons, welcome you to get in touch with us. Whether you have a
          query, suggestion, or wish to leave a review, your input is valuable
          to us.
        </p>
        <p>
          Your guidelines and reviews enhance our welfare services and help us
          serve better. Please feel free to contact or mail us.
        </p>
      </section>

      <section className="address-information to-animate" ref={sectionRef2}>
        <h1>Office Address</h1>
        <div>
          <h3>Address:</h3>
          <p>
            20, GABBAR APARTMENT, OPP. AMBAJI TEMPLE, WATER TANK ROAD,
            KARELIBAUG, VADODARA - 390 018 GUJARAT, INDIA
          </p>
          <h3>Telephone:</h3>
          <p>(0265)&nbsp;-&nbsp;2489807</p>
          <h3>Email:</h3>
          <p>
            <a href="mailto:samvedna2010@yahoo.in" className="link">
              samvedna2010@yahoo.in
            </a>
            <br />
            <a href="mailto:samvednatrust2010@gmail.com" className="link">
              samvednatrust2010@gmail.com
            </a>
          </p>
        </div>
      </section>

      <section className="contact-persons">
        <h1>Contact Persons</h1>
        <div className="persons">
          <div className="person to-animate" ref={listItemRef1}>
            <img src={Tarulata} alt="Tarulata Patel" />
            <h3>
              SMT. TARULATTA PATEL
              <span className="person-title">
                (Founder | Trustee | President)
              </span>
            </h3>
            <p>TEL: (0265) - 2489807</p>
          </div>
          <div className="person to-animate" ref={listItemRef2}>
            <img src={Mayank} alt="Mayank Patel" />
            <h3>
              MAYANK PATEL
              <span className="person-title">(Trustee & Secretary)</span>
            </h3>
            <p>
              MOB:{" "}
              <a href="tel:+919898718766" className="link">
                +919898718766
              </a>
            </p>
          </div>
          <div className="person to-animate" ref={listItemRef3}>
            <img src={Sagar} alt="Sagar Patel" />
            <h3>
              SAGAR PATEL<span className="person-title">(Co-Ordinator)</span>
            </h3>
            <p>
              MOB:{" "}
              <a href="tel:+919898608426" className="link">
                +919898608426
              </a>
            </p>
          </div>
        </div>
      </section>

      <section className="contact-form to-animate" ref={sectionRef3}>
        <h1>Contact Form</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Enter Full Name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter Email Address"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
          <input
            type="tel"
            id="contact"
            name="contact"
            placeholder="Enter Phone or Mobile No (with country code)"
            value={formData.contact}
            onChange={handleInputChange}
            required
          />
          <textarea
            id="address"
            name="address"
            placeholder="Enter Address (with area, city, state, country, and pin code)"
            value={formData.address}
            onChange={handleInputChange}
            required
          />
          <textarea
            id="message"
            name="message"
            placeholder="Enter Message"
            value={formData.message}
            onChange={handleInputChange}
            required
          />
          <button className="btn btn-full" type="submit">Submit</button>
        </form>
      </section>
    </div>
  );
};

export default Contact;
