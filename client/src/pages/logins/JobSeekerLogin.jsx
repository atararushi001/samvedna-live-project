import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

// import { SessionState } from "../../context/SessionProvider";

const API = import.meta.env.VITE_API_URL;

const JobSeekerLogin = () => {
  const navigate = useNavigate();
  // const { setIsLoggedIn, setJobSeekerId, setRecruiterId } = SessionState();

  useEffect(() => {
    const isLoggedIn = sessionStorage.getItem("isLoggedIn");
    const jobSeekerId = sessionStorage.getItem("job_seekers_id");
    const recruiterId = sessionStorage.getItem("recruiters_id");

    if (isLoggedIn) {
      if (jobSeekerId) {
        navigate("/job-seeker-dashboard");
      } else if (recruiterId) {
        navigate("/recruiter-dashboard");
      }
    }
    else{
      navigate("/job-seeker-login");

    }
  }, [navigate]);

  // useEffect(() => {
  //   fetch(`${API}/utils/checkLogin.php`, {
  //     method: "GET",
  //     credentials: "include",
  //   })
  //     .then((response) => {
  //       if (!response.ok) {
  //         throw new Error(`HTTP error! status: ${response.status}`);
  //       }

  //       return response.json();
  //     })
  //     .then((data) => {
  //       console.log(data);
  //       if (data.is_logged_in) {
  //         setIsLoggedIn(true);
  //         if (data.job_seekers_id) {
  //           setJobSeekerId(data.job_seekers_id);
  //           navigate("/job-seeker-dashboard");
  //         } else if (data.recruiters_id) {
  //           setRecruiterId(data.recruiters_id);
  //           navigate("/recruiter-dashboard");
  //         }
  //       } else {
  //         setIsLoggedIn(false);
  //         setJobSeekerId(null);
  //       }
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  // }, [setIsLoggedIn, setRecruiterId, setJobSeekerId, navigate]);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    e.preventDefault();
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = new FormData();
    data.append("email", formData.email);
    data.append("password", formData.password);

    try {
      const response = await fetch(`${API}/controllers/jobSeekerLogin.php`, {
        method: "POST",
        body: data,
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const responseData = await response.json();

      if (responseData.success) {
        toast.success(responseData.message);
        sessionStorage.setItem("isLoggedIn", true);
        sessionStorage.setItem("job_seekers_id", responseData.job_seeker_id);
        navigate("/job-seeker-dashboard");
      } else {
        toast.error(responseData.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred: " + error.message);
    }
  };

  return (
    <>
      <div className="container">
        <section className="job-seeker-login">
          <h1>Job Seeker&apos;s Login</h1>
          <form className="login-form" onSubmit={handleSubmit}>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Enter Your Email Address"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Enter Your Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <button className="btn btn-full" name="recruiterLoginButton">
              Login
            </button>
            <Link to="/job-seeker/forgot-password" className="forgot-password">
              Forgot Password?
            </Link>
          </form>
        </section>
      </div>
    </>
  );
};

export default JobSeekerLogin;
