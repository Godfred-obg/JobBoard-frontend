import add from "./images/add.svg";
import React, { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import Dashboardnav from "./Dashboardnav";
import JobPost from "./JobPost";
import logo1 from "./images/job1.svg";
import Contact from "./Contact";

const Employer = () => {
  const [jobs, setjobs] = useState([]);

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

  return (
    <div className="dashboard">
      <Dashboardnav />

      <div className="container">
        <div className="option-container">
          <div id="alljobs">
            <JobPost />
          </div>

          <div className="jobsearch" id="application">
            <div className="jobs">
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

export default Employer;
