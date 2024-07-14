import React, { useState, useRef, useEffect } from "react";
import Contact from "./Contact";
import arrow from "./images/arrow-down.svg";
import logo from "./images/job1.svg";
import close from "./images/close.svg";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const JobPost = () => {
  const navigate = useNavigate();

  const [jobs, setjobs] = useState([]);
  const [category, setcategory] = useState("");
  const [location, setlocation] = useState("");
  const [nome, setnome] = useState("");
  const [data, setData] = useState({
    position: "",
    category: "",
    location: "",
    description: "",
    employer: "",
    company: "",
    employer: "",
  });

  const loadjobs = async () => {
    try {
      const id = localStorage.getItem("user_id");
      const response = await fetch(
        `https://jobfinder-godfreds-projects.vercel.app/post/${id}`
      );

      const jsonData = await response.json();
      setjobs(jsonData);
      localStorage.setItem("pos", "");

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
    data.company = localStorage.getItem("company");
    data.employer = localStorage.getItem("user_id");
    data.category = localStorage.getItem("category");
    data.location = localStorage.getItem("location");
    e.preventDefault();

    try {
      const response = await fetch(
        "https://jobfinder-godfreds-projects.vercel.app/postjob",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }
      );

      const jsonData = await response.json();
      if (jsonData.error) {
        toast.error(jsonData.error);
      } else toast.success("Job Posted");
      document.getElementById("overlay").style.display = "block";
      document.getElementById("job-post").style.display = "none";
      document.getElementById("overlay").style.display = "none";
      loadjobs();
    } catch (err) {
      console.error(err.message);
    }
  };

  const closejob = async (id, identifier) => {
    try {
      const response = await fetch(
        `https://jobfinder-godfreds-projects.vercel.app/closejob/${id}`
      );

      const jsonData = await response.json();
      if (jsonData.error) {
        toast.error(jsonData.error);
      } else {
        toast.success("Job Closed");
        loadjobs();
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
    data.location = loc;
  };
  const increment2 = (loc) => {
    setcategory(loc); // Updating state triggers re-render of ParentComponent
    data.category = loc;
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
        localStorage.setItem("location", country.getAttribute("value"));
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
        localStorage.setItem("category", category.getAttribute("value"));
        increment2(category.value);
      });
    });
  }, []);

  const handleclick = (id) => {
    if (id === "posting") {
      if (document.getElementById("job-post").style.display !== "flex")
        document.getElementById("job-post").style.display = "flex";
      document.getElementById("overlay").style.display = "block";
    }
    if (id === "close") {
      document.getElementById("job-post").style.display = "none";
      document.getElementById("overlay").style.display = "none";
    }
  };

  const jobSelect = (id) => {
    if (localStorage.getItem("login") === "true") {
      localStorage.setItem("id", id);
      navigate("/candidates");
    }
  };

  return (
    <div className="jobsearch" id="searchjobs">
      <div id="top">
        <button id="posting" onClick={() => handleclick("posting")}>
          Post Job
        </button>
        <h4>{localStorage.getItem("company")}</h4>
      </div>

      <div id="job-post">
        <img
          id="close"
          src={close}
          alt=""
          onClick={() => handleclick("close")}
        />
        <form onSubmit={onSubmitForm} action="" id="insert-form">
          <input
            type="text"
            placeholder="Position"
            value={data.position}
            onChange={(e) => setData({ ...data, position: e.target.value })}
            id="pos"
          />
          <div id="dropdown">
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
                <a
                  value="Operations and Logistics"
                  href=""
                  id="category-select"
                >
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
          </div>
          <textarea
            placeholder="job description"
            name=""
            id="descrizione"
            cols="30"
            rows="10"
            value={data.description}
            onChange={(e) => setData({ ...data, description: e.target.value })}
          ></textarea>
          <button id="submit">Post Job</button>
        </form>
      </div>

      <div className="jobs employer">
        <h3>Posted jobs:</h3>
        {jobs.map((job) => (
          <div className="job" key={job.job_id} id="jobid">
            <div id="left-side-job">
              <img src={logo} id="company-icon" alt="company-icon" />
              <div className="job-details" id="employerdetail">
                <h5 id="job-title" onClick={() => jobSelect(job.job_id)}>
                  {job.nome}
                </h5>
                <h5 id="job-location">
                  <span>Location: </span>
                  {job.location}
                </h5>
              </div>
            </div>
            {job.job_status === "open" ? (
              <button
                onClick={(e) => closejob(job.job_id, e.target.id)}
                id={`closebutton${job.job_id}`}
              >
                close
              </button>
            ) : (
              <button id="closed" disabled>
                closed
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobPost;
