import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

import JobCarousel from "./components/JobCarousel";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const API = import.meta.env.VITE_API_URL;

const Home = () => {
  const [count, setCount] = useState({ state: 0, people: 0, jobs: 0 });
  const [jobData, setJobData] = useState([]);
  const counterRef = useRef(null);

  const incrementCounter = (counter, target) => {
    let current = count[counter];
    const interval = setInterval(() => {
      if (current < target) {
        current++;
        setCount((prevCount) => ({ ...prevCount, [counter]: current }));
      } else {
        clearInterval(interval);
      }
    }, 10);
  };

  useEffect(() => {
    fetch(`${API}/utils/latest-jobs`, {
      method: "GET",
      credentials: "include",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        if (data.results) {
          setJobData(data.results);
        } else {
          console.log("No results found");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          incrementCounter("state", 6);
          incrementCounter("people", 400);
          incrementCounter("jobs", 200);
        }
      });
    });

    if (counterRef.current) {
      observer.observe(counterRef.current);
    }

    const currentRef = counterRef.current;
    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  const [sectionRefs, setSectionRefs] = useState([]);
  const elementsRef = useRef([]);

  useEffect(() => {
    setSectionRefs(elementsRef.current);
  }, []);

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

    sectionRefs.forEach((ref) => {
      if (ref) {
        observer.observe(ref);
      }
    });

    return () => {
      sectionRefs.forEach((ref) => {
        if (ref) {
          observer.unobserve(ref);
        }
      });
    };
  }, [sectionRefs]);

  return (
    <>
      <Helmet>
        <meta
          name="description"
          content="disABLED PERSON'S SOCIAL WELFARE TRUST"
        />
        <meta
          name="keywords"
          content="samvedna,disABLED,disability job portal"
        />
      </Helmet>

      <section className="register-type-container slider-1">
        <div className="register-type">
          <h1>Are you Recruiter?</h1>
          <Link to="/recruiter-register">
            <button className="btn">Recruiter Register</button>
          </Link>
        </div>
        <div className="divider"></div>
        <div className="register-type">
          <h1>Are you a Job Seeker?</h1>
          <Link to="/job-seeker-register">
            <button className="btn btn-outline">Job Seeker Register</button>
          </Link>
        </div>
      </section>

      <div className="container ">
        <section className="self-employed-header">
          <div className="header-text">
            <h1>Are you Self Employed?</h1>
            <p>
              Fill out the form to register as a self-employed individual and we
              will help you find the right opportunities.
            </p>
            <Link to="/self-employment-register">
              <button className="btn">Apply Here</button>
            </Link>
          </div>
          <div className="header-image-container">
            <div className="header-image"></div>
          </div>
        </section>
      </div>

      <section className="matrimony">
        <div className="container">
          <h1>
            Matrimony <span className="highlight-text">Services</span>
          </h1>
          <div className="matrimony-content">
            <p>
              At <strong>&ldquo;SAMVEDNA&rdquo;</strong>, we believe that{" "}
              <strong>love knows no boundaries</strong>. Our Matrimony Services
              are designed to help individuals with disabilities find their
              perfect match, regardless of their physical challenges. Our
              dedicated team works tirelessly to connect like-minded
              individuals, fostering meaningful relationships that stand the
              test of time. Whether you&apos;re looking for companionship,
              friendship, or love, we&apos;re here to help you find your
              soulmate. Join us in celebrating the beauty of love and
              togetherness, where every heart finds its true match.
            </p>

            <Link to="/matrimony-registration">
              <button className="btn">Register Here</button>
            </Link>
          </div>
        </div>
      </section>

      <div className="container">
        <section
          className="main-slogan to-animate"
          ref={(el) => elementsRef.current.push(el)}
        >
          <h1>
            What is <strong className="highlight-text">Samvedna?</strong>
          </h1>
          <p>
            Welcome to <strong>&ldquo;SAMVEDNA&rdquo;</strong> - A Pioneer Trust
            in <strong>GPT</strong> i.e. Guiding, Progression, and
            Transformation
          </p>
          <p className="italic">
            &ldquo;The Comprehensive Hub for Persons with Disabilities (PWDs)
            Employment, Entrepreneurship, Talent, Relationships, Community and
            eCommerce&rdquo;
          </p>
          <p>
            <strong>
              &ldquo;Embracing Diversity…Unlocking Potential…Empowering
              Lives&rdquo;
            </strong>
          </p>
          <p className="italic">
            Let&apos;s understand the word{" "}
            <strong>&ldquo;SAMVEDNA&rdquo;</strong> - &ldquo;<strong>S</strong>
            ustaining <strong>A</strong>bilities, <strong>M</strong>otivating
            &nbsp;<strong>V</strong>ision, <strong>E</strong>mpowering{" "}
            <strong>D</strong>reams, <strong>N</strong>urturing &nbsp;
            <strong>A</strong>spirations.&rdquo;
          </p>
          <p>
            I am a man on a mission whose <strong>disABILITY</strong>{" "}
            hasn&apos;t won.
          </p>
        </section>
      </div>

      <section className="what-are-we">
        <div
          className="container to-animate"
          ref={(el) => elementsRef.current.push(el)}
        >
          <h1>
            What <span>we</span> are as a <br />{" "}
            <span className="highlight-text">SAMVEDNA TRUST</span>
          </h1>
          <p>
            Established on March 26th, 2010, SAMVEDNA is a registered
            organization under the Charity Commissioner, Vadodara, Gujarat,
            India, dedicated to empowering individuals with disabilities.
          </p>
          <p>
            <strong>“SAMVEDNA”</strong> Ideology is based on five “Ss”
          </p>
          <p className="highlight italic">
            SERVICE <FontAwesomeIcon icon="circle" className="dot-icon" />{" "}
            SINCERITY <FontAwesomeIcon icon="circle" className="dot-icon" />{" "}
            SACRIFICE <FontAwesomeIcon icon="circle" className="dot-icon" />{" "}
            SUPPORT <FontAwesomeIcon icon="circle" className="dot-icon" />{" "}
            SUCCESS
          </p>
          <p>
            <strong>
              &ldquo;Transforming Lives, Enriching Futures: SAMVEDNA&apos;s
              Pledge to Persons with Disabilities&rdquo;
            </strong>
          </p>
          <p>
            Step into a realm where compassion meets action, where every
            heartbeat resonates with the promise of empowerment. SAMVEDNA
            isn&apos;t just an organization; it&apos;s a beacon of hope,
            illuminating the path towards a brighter tomorrow for those often
            overlooked in society.
          </p>
          <p>
            Our mission transcends boundaries, fueled by the unwavering belief
            that every individual, regardless of ability, deserves a chance to
            shine. From nurturing dreams of self-reliance to igniting the flames
            of entrepreneurship, we&apos;re the architects of change, sculpting
            a landscape where obstacles are mere stepping stones to success.
          </p>
          <p>
            Join us in rewriting the narrative, in championing the cause of
            inclusivity and dignity. Together, let&apos;s paint a masterpiece of
            possibility, where every stroke of kindness leaves an indelible mark
            on the canvas of humanity.
          </p>
        </div>
      </section>

      <section className="understand-disability ">
        <div
          className="container to-animate"
          ref={(el) => elementsRef.current.push(el)}
        >
          <h1>
            Let&apos;s Understand{" "}
            <span className="highlight-text">disABILITY</span>
          </h1>
          <div className="slogan">
            <div className="images"></div>
            <p>
              &ldquo; Disability is not a barrier; it&apos;s an opportunity for
              diverse abilities to shine. We recognize that individuals with
              physical impairments may face challenges due to attitudinal and
              environmental barriers. However, we celebrate their unique talents
              and capabilities, emphasizing their ABILITIES rather than their
              disabilities. We believe in creating a society that values
              inclusion and diversity, where everyone&apos;s potential can
              flourish&rdquo;
              <br />
              <br />
              <strong>
                “Together, let&apos;s build a future where everyone can thrive,
                regardless of their abilities.”
              </strong>
            </p>
          </div>
        </div>
      </section>

      <div className="container">
        <section className="what-we-do">
          <h1>
            What <span className="highlight-text">We</span> Do?
          </h1>
          <div
            className="cards to-animate"
            ref={(el) => elementsRef.current.push(el)}
          >
            <div className="card">
              <h2 className="highlight-text">OUR INTENTION</h2>
              <h3>Unlocking the Potential of PWDs</h3>
              <p>
                At <strong>&ldquo;SAMVEDNA&rdquo;,</strong> we believe in
                harnessing the abilities of individuals with disabilities by
                focusing on their strengths, talents, and aspirations. Our
                mission is to remove the stigma associated with disabilities and
                empower these individuals to achieve their dreams. We strive to
                provide them with the support, resources, and opportunities they
                need to lead fulfilling lives with dignity and respect.
              </p>
            </div>
            <div className="card ">
              <h2 className="highlight-text">OUR AIM</h2>
              <h3>Empowering PWDs for Independence</h3>
              <p>
                Our goal is to support and empower physically challenged
                individuals who lack adequate support in society. Through skill
                development and training programs, we aim to equip them with the
                necessary tools to lead independent lives and support themselves
                and their families. At <strong>&ldquo;SAMVEDNA&rdquo;,</strong>{" "}
                we strongly advocate for the integration and inclusion of
                persons with disabilities into society, ensuring their financial
                self-sufficiency and overall well-being.
              </p>
            </div>
            <div className="card ">
              <h2 className="highlight-text">OUR BELIEF - Values of Life</h2>
              <h3>Adding Value Through Empowerment</h3>
              <p>
                <strong>&ldquo;SAMVEDNA&rdquo;</strong> is committed to adding
                value to the lives of persons with disabilities through
                empowerment and support. We believe in providing opportunities
                for employment and self-employment rather than relying solely on
                charity. By empowering individuals with disabilities, we aim to
                share their experiences, challenges, and victories, fostering a
                sense of community and support.
              </p>
            </div>

            <div className="card ">
              <h2 className="highlight-text">OUR EXPECTATION</h2>
              <h3>Creating Equal Opportunities</h3>
              <p>
                Our mission is to create equal opportunities for persons with
                disabilities, ensuring their full participation and inclusion in
                society. We believe that every individual, regardless of their
                abilities, deserves an equal chance to succeed. Through advocacy
                and awareness initiatives, we work towards breaking down
                barriers and promoting inclusivity and equality for all.
              </p>
            </div>
            <div className="card ">
              <h2 className="highlight-text">OUR VISION</h2>
              <h3>Humanitarian Excellence</h3>
              <p>
                We envision a society where every individual is empowered to
                make a difference in the lives of others. Through our
                initiatives, we aim to inspire individuals to give back to those
                less fortunate, creating a culture of compassion and empathy. At
                <strong> &ldquo;SAMVEDNA&rdquo;,</strong> we believe in the
                power of collective action to bring about positive change and
                transform lives thereby HUMANIZE disABILITIES
              </p>
            </div>
            <div className="card ">
              <h2 className="highlight-text">OUR MISSION</h2>
              <h3>Empowering Lives, One Step at a Time</h3>
              <p>
                Our mission is to empower persons with disabilities by providing
                them with the support and resources they need to thrive. Through
                our <strong>&ldquo;Mission Empowerment&rdquo;</strong>{" "}
                initiative, we strive to connect skilled individuals with
                employment opportunities that align with their abilities and
                aspirations. By harnessing the potential of every individual, we
                hope to create a more inclusive and equitable society for all.
              </p>
            </div>
          </div>
        </section>
        <section className="performance">
          <h1>
            Exceptional <span className="highlight-text">Performance</span> &
            <span className="highlight-text"> Abilities</span>
          </h1>
          <p>
            At <strong>&ldquo;SAMVEDNA&rdquo;</strong>, we recognize that
            individuals with physical disabilities may face unique challenges.
            However, history has shown that these individuals have not let their
            disabilities define them. Instead, they have risen above their
            challenges and excelled in various fields, showcasing their
            remarkable abilities. Today, we proudly refer to them as{" "}
            <strong>&ldquo;UNIQUELY ABLED CHAMPIONS&rdquo;</strong> a term
            recently endorsed by the Honorable Prime Minister of India Narendra
            Modi as <strong>&ldquo;DIVYANG&rdquo;</strong>. We celebrate their
            resilience, strength, and achievements, emphasizing their
            exceptional talents and contributions to society.
          </p>
        </section>
        <section className="initiative">
          <h1>
            An Initiative - <span className="highlight-text">H.O.P.E</span>
          </h1>
          <p>
            We are thrilled to introduce H.O.P.E - Host Opportunity Promote
            Employment, a targeted campaign designed exclusively for employers
            like you. Our goal is simple: to encourage and empower companies to
            host job opportunities for persons with disabilities (PWDs) and
            thereby promote inclusive employment practices. By participating in
            this initiative, you not only contribute to creating a more diverse
            and equitable workforce but also open doors to talented individuals
            who are often overlooked. Join us in our mission to build a more
            inclusive society where everyone has the opportunity to thrive.
          </p>
        </section>
      </div>
      <section className="journey" ref={counterRef}>
        <div className="container">
          <h1>
            Our <span className="highlight-text">Journey</span>
          </h1>
          <div className="counter-container">
            <div className="counter">
              <h2 id="state-counter">{count.state}</h2>
              <p>States in India</p>
            </div>
            <div className="counter">
              <h2 id="people-counter">{count.people}</h2>
              <p>People</p>
            </div>
            <div className="counter">
              <h2 id="jobs-counter">{count.jobs}</h2>
              <p>Jobs</p>
            </div>
          </div>
        </div>
      </section>

      <div className="container">
        <section className="latest-jobs">
          <h1>
            Latest <span className="highlight-text">Jobs</span>
          </h1>
          <JobCarousel jobData={jobData} />
        </section>
      </div>

      <div className="container">
        <section className="goal">
          <h1>
            Our <span className="highlight-text">Goals</span>
          </h1>
          <ol className="goals" role="list">
            <li
              className="goal-list-item odd-item to-animate"
              ref={(el) => elementsRef.current.push(el)}
            >
              To take measures for creating a Barrier-free environment.
            </li>
            <li
              className="goal-list-item even-item to-animate"
              ref={(el) => elementsRef.current.push(el)}
            >
              To assist in accessibility of Equal Opportunity and Protection of
              Rights, life, and inherent dignity.
            </li>
            <li
              className="goal-list-item odd-item to-animate"
              ref={(el) => elementsRef.current.push(el)}
            >
              To contribute efforts in providing Employment/Placement related
              services.
            </li>
            <li
              className="goal-list-item even-item to-animate"
              ref={(el) => elementsRef.current.push(el)}
            >
              To contribute efforts for uplifting Social Status.
            </li>
            <li
              className="goal-list-item odd-item to-animate"
              ref={(el) => elementsRef.current.push(el)}
            >
              To provide Technical or Vocational Training/skills for
              self-independence.
            </li>
            <li
              className="goal-list-item even-item to-animate"
              ref={(el) => elementsRef.current.push(el)}
            >
              To assist in marketing commodities and articles manufactured by
              disABLED persons.
            </li>
            <li
              className="goal-list-item odd-item to-animate"
              ref={(el) => elementsRef.current.push(el)}
            >
              Arrange job work for skilled craftsman and artisan personnel to
              enable self-support.
            </li>
            <li
              className="goal-list-item even-item to-animate"
              ref={(el) => elementsRef.current.push(el)}
            >
              Bring together people who are maimed or deformed.
            </li>
            <li
              className="goal-list-item odd-item to-animate"
              ref={(el) => elementsRef.current.push(el)}
            >
              Seek solutions to disABILITY through access to orthopedic
              services, surgery, aids, and appliances.
            </li>
            <li
              className="goal-list-item even-item to-animate"
              ref={(el) => elementsRef.current.push(el)}
            >
              Prevent members from leading secluded lives and involve them in
              social, cultural, and sporting activities/events.
            </li>
            <li
              className="goal-list-item odd-item to-animate"
              ref={(el) => elementsRef.current.push(el)}
            >
              Promote cooperative ventures.
            </li>
            <li
              className="goal-list-item even-item to-animate"
              ref={(el) => elementsRef.current.push(el)}
            >
              Facilitate work-at-home projects like dressmaking, sewing,
              tailoring, art, and craft.
            </li>
            <li
              className="goal-list-item odd-item to-animate"
              ref={(el) => elementsRef.current.push(el)}
            >
              Help poor and needy meritorious students by providing educational
              aids.
            </li>
            <li
              className="goal-list-item even-item to-animate"
              ref={(el) => elementsRef.current.push(el)}
            >
              Exhibit, market, and export handicrafts products made by
              differently-abled persons.
            </li>
          </ol>
        </section>

        <section className="testimonials">
          <h1>
            What <span className="highlight-text">People</span> Say
          </h1>
          <div className="testimonial-cards">
            <div className="testimonial-card to-animate">
              <FontAwesomeIcon icon="quote-left" className="quote-icon" />
              <div className="testimonial-content">
                <p>
                  Samvedna Trust has been a beacon of hope in my journey towards
                  employment. Their personalized support and guidance helped me
                  secure a job that aligns perfectly with my skills and
                  aspirations. I am grateful for their dedication to empowering
                  individuals with disabilities.
                </p>
              </div>
              <div className="testimonial-author">
                <h3>- Priya Sharma, Mumbai</h3>
              </div>
            </div>
            <div className="testimonial-card to-animate">
              <FontAwesomeIcon icon="quote-left" className="quote-icon" />
              <div className="testimonial-content">
                <p>
                  I never imagined finding a job that not only accommodates my
                  disability but also celebrates my abilities. Thanks to
                  Samvedna Trust, I am now thriving in a fulfilling career that
                  brings out the best in me. Their unwavering support has
                  transformed my life.
                </p>
              </div>
              <div className="testimonial-author">
                <h3>- Ananya Patel, Ahmedabad</h3>
              </div>
            </div>
            <div className="testimonial-card to-animate">
              <FontAwesomeIcon icon="quote-left" className="quote-icon" />
              <div className="testimonial-content">
                <p>
                  Samvedna Trust truly understands the challenges faced by job
                  seekers with disabilities. Their holistic approach, from
                  skills training to placement support, empowers individuals to
                  overcome barriers and achieve their career goals. I am forever
                  grateful for their unwavering support
                </p>
              </div>
              <div className="testimonial-author">
                <h3>- Neha Gupta, Pune</h3>
              </div>
            </div>
            <div className="testimonial-card to-animate">
              <FontAwesomeIcon icon="quote-left" className="quote-icon" />
              <div className="testimonial-content">
                <p>
                  Samvedna Trust has been a lifeline in my job search journey.
                  Their guidance and encouragement boosted my confidence and
                  helped me secure a job that values my skills and potential. I
                  am grateful for their unwavering support and commitment to
                  empowering individuals like me
                </p>
              </div>
              <div className="testimonial-author">
                <h3>- Deepak Singh, Kolkatae</h3>
              </div>
            </div>
            <div className="testimonial-card to-animate">
              <FontAwesomeIcon icon="quote-left" className="quote-icon" />
              <div className="testimonial-content">
                <p>
                  Finding employment as a person with a disability can be
                  challenging, but Samvedna Trust made the process seamless.
                  Their personalized approach, coupled with their extensive
                  network of employers, opened doors to opportunities I never
                  thought possible. Thank you for believing in me.
                </p>
              </div>
              <div className="testimonial-author">
                <h3>- Riya Verma, Hyderabad</h3>
              </div>
            </div>
            <div className="testimonial-card to-animate">
              <FontAwesomeIcon icon="quote-left" className="quote-icon" />
              <div className="testimonial-content">
                <p>
                  Samvedna Trust is more than just a placement agency; they are
                  true advocates for people with disabilities. Their
                  compassionate team understood my unique needs and connected me
                  with a job that matches my skills and interests perfectly. I
                  am forever grateful for their support and encouragement.
                </p>
              </div>
              <div className="testimonial-author">
                <h3>- Arjun Kumar, Chandigarh</h3>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Home;
