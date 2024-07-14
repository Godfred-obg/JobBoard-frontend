import React, { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import logo from "./images/logo.png";
import logo1 from "./images/job1.svg";
import user from "./images/user.svg";
import JobSearch from "./JobSearch";
import Dashboardnav from "./Dashboardnav";
import Contact from "./Contact";

const Dashboard = () => {
  let nome = "";
  let stato = "";
  const token = localStorage.getItem("token");

  if (token) {
    try {
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.nome; // Adjust according to your token's structure
      nome = userId;
      stato = decodedToken.stato;
    } catch (error) {
      console.error("Invalid token", error);
    }
  }

  const handleclick = (id) => {
    const element = document.getElementById(id);
    if (element && !element.classList.contains("active")) {
      element.classList.toggle("active");
      const otherId = id === "user-option2" ? "user-option1" : "user-option2";
      document.getElementById(otherId).classList.toggle("active");
    }
    if (id === "user-option1") {
      document.getElementById("alljobs").style.display = "block";
      document.getElementById("application").style.display = "none";
    } else {
      document.getElementById("alljobs").style.display = "none";
      document.getElementById("application").style.display = "flex";
    }
  };

  const toggleHeight = (event) => {
    event.preventDefault();
    var container = document.querySelector(".profile");
    container.classList.toggle("expanded");
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      var container = document.querySelector(".profile");
      const optionClicked = event.target.closest(".profile");
      const locationButton = event.target.closest(".right-nav-dashboard");

      if (
        !optionClicked &&
        locationButton &&
        !locationButton.querySelector(".profile")
      ) {
        container.classList.remove("expanded");
      }

      if (!locationButton) {
        container.classList.remove("expanded");
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const [jobs, setjobs] = useState([]);

  const loadapplied = async () => {
    const id = localStorage.getItem("user_id");
    try {
      const response = await fetch(
        `https://jobfinder-godfreds-projects.vercel.app/applied/${id}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );

      const jsonData = await response.json();
      setjobs(jsonData);

      if (jsonData) {
        console.log("Account found:", jsonData);
      } else {
        console.log("Account not found");
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    loadapplied();
  }, []);

  if (!token) {
    return null; // Handle case where there is no token
  }

  return (
    <div className="dashboard">
      <Dashboardnav />

      <div className="container">
        <div className="user-options">
          <h4
            className="active"
            id="user-option1"
            onClick={() => handleclick("user-option1")}
          >
            Find Job
          </h4>
          <h4 id="user-option2" onClick={() => handleclick("user-option2")}>
            Applied
          </h4>
        </div>
        <div className="option-container">
          <div id="alljobs">
            <JobSearch />
          </div>

          <div className="jobsearch" id="application">
            <div className="jobs employee">
              <h3>Jobs you have applied to:</h3>
              {jobs.map((job) => (
                <div className="job" key={job.job_id}>
                  <div id="left-side-job">
                    <img src={logo1} id="company-icon" alt="company-icon" />
                    <div className="job-details">
                      <h5 id="job-title">{job.nome}</h5>
                      <h5 id="job-location">
                        <span>Location: </span>
                        {job.location}
                      </h5>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Contact />
    </div>
  );
};

export default Dashboard;
