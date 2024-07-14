import React, { useState, useRef, useEffect } from "react";
import Navbar from "./Navbar";
import arrow from "./images/arrow-down.svg";
import logo from "./images/job1.svg";
import { useNavigate } from "react-router-dom";

const JobSearch = () => {
  const navigate = useNavigate();

  const [jobs, setjobs] = useState([]);
  const [nome, setnome] = useState("");
  const [category, setcategory] = useState("");
  const [location, setlocation] = useState("");

  const loadjobs = async () => {
    try {
      const response = await fetch(
        "https://jobfinder-godfreds-projects.vercel.app/job"
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
    loadjobs();
  }, []);

  const onSubmitForm = async (e) => {
    e.preventDefault();
    const cat = document.getElementById("category-name").getAttribute("value");
    const loc = document.getElementById("location-name").getAttribute("value");

    try {
      const params = new URLSearchParams({
        nome,
        cat: cat === undefined || cat === null ? "null" : cat,
        loc: loc === undefined || loc === null ? "null" : loc,
      });

      const response = await fetch(
        `https://jobfinder-godfreds-projects.vercel.app/job/filter/${nome}/${params.cat}/${params.loc}`
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

  const toggleHeight = (event) => {
    event.preventDefault();
    var container = document.querySelector(".option");
    container.classList.toggle("expanded");
  };
  const toggleHeight2 = (event) => {
    event.preventDefault();
    var container2 = document.querySelector(".option2");
    container2.classList.toggle("expanded");
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      var container = document.querySelector(".option");
      var container2 = document.querySelector(".option2");
      const optionClicked = event.target.closest(".option");
      const option2Clicked = event.target.closest(".option2");
      const locationButton = event.target.closest(".jobsearch button");

      // Close Location dropdown if clicked outside
      if (
        !optionClicked &&
        locationButton &&
        !locationButton.querySelector(".option")
      ) {
        container.classList.remove("expanded");
      }

      // Close Category dropdown if clicked outside
      if (
        !option2Clicked &&
        locationButton &&
        !locationButton.querySelector(".option2")
      ) {
        container2.classList.remove("expanded");
      }
      if (!locationButton) {
        container2.classList.remove("expanded");
        container.classList.remove("expanded");
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const increment = (loc) => {
    setlocation(loc); // Updating state triggers re-render of ParentComponent
  };
  const increment2 = (loc) => {
    setcategory(loc); // Updating state triggers re-render of ParentComponent
  };

  useEffect(() => {
    const countries = document.querySelectorAll("#country-select");
    countries.forEach((country) => {
      country.addEventListener("click", () => {
        document.getElementById("paesi").value = country.value;
        document.getElementById("location-name").innerText =
          country.getAttribute("value");
        document
          .getElementById("location-name")
          .setAttribute("value", country.getAttribute("value"));
        increment(country.value);
      });
    });

    const categories = document.querySelectorAll("#category-select");
    categories.forEach((category) => {
      category.addEventListener("click", () => {
        document.getElementById("categorie").value = category.value;
        document.getElementById("category-name").innerText =
          category.getAttribute("value");
        document
          .getElementById("category-name")
          .setAttribute("value", category.getAttribute("value"));
        increment2(category.value);
      });
    });
  }, []);

  const handleLoadJobsClick = (e) => {
    e.preventDefault();
    loadjobs();
  };

  const jobSelect = (id) => {
    if (localStorage.getItem("login") === "true") {
      localStorage.setItem("id", id);
      navigate("/jobdetail");
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="jobsearch" id="searchjobs">
      <form onSubmit={onSubmitForm} action="">
        <button id="all" onClick={handleLoadJobsClick}>
          All
        </button>
        <input
          type="text"
          placeholder="Position..."
          value={nome}
          onChange={(e) => setnome(e.target.value)}
        />
        <button id="categorie" onClick={toggleHeight} value="">
          <h4 id="category-name" value="">
            Category
          </h4>
          <img id="arrow" src={arrow} alt="" />
          <div className="option">
            <a value="Information Technology" href="" id="category-select">
              Information Technology
            </a>
            <a value="Healthcare" href="" id="category-select">
              Healthcare
            </a>
            <a value="Education" href="" id="category-select">
              Education
            </a>
            <a value="Finance" href="" id="category-select">
              Finance
            </a>
            <a value="Sales and Marketing" href="" id="category-select">
              Sales and Marketing
            </a>
            <a value="Engineering" href="" id="category-select">
              Engineering
            </a>
            <a value="Operations and Logistics" href="" id="category-select">
              Operations and Logistics
            </a>
          </div>
        </button>
        <button id="paesi" onClick={toggleHeight2} value="">
          <h4 id="location-name" value="">
            Location
          </h4>
          <img id="arrow" src={arrow} alt="" />
          <div className="option2">
            <a href="" value="Italy" id="country-select">
              Italy
            </a>
            <a href="" value="Spain" id="country-select">
              Spain
            </a>
            <a href="" value="UK" id="country-select">
              UK
            </a>
            <a href="" value="Germany" id="country-select">
              Geramny
            </a>
            <a href="" value="Russia" id="country-select">
              Russia
            </a>
            <a href="" value="USA" id="country-select">
              USA
            </a>
            <a href="" value="Canada" id="country-select">
              Canada
            </a>
            <a href="" value="Remote" id="country-select">
              Remote
            </a>
          </div>
        </button>
        <button id="submit">Find Job</button>
      </form>

      <div className="jobs">
        <h3>Top job picks for you:</h3>
        {jobs.map((job) => (
          <div className="job" key={job.job_id}>
            <div id="left-side-job">
              <img src={logo} id="company-icon" alt="company-icon" />
              <div className="job-details">
                <h5 id="job-title" onClick={() => jobSelect(job.job_id)}>
                  {job.nome_job}
                </h5>
                <h5 id="company">{job.company_name}</h5>
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
  );
};

export default JobSearch;
