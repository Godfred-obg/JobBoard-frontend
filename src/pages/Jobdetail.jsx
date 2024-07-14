import React, { useState, useEffect } from "react";
import Dashboardnav from "./Dashboardnav";
import logo from "./images/location.svg";
import logo1 from "./images/job1.svg";
import { toast } from "react-hot-toast";
import close from "./images/close.svg";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Contact from "./Contact";

const Jobdetail = () => {
  const navigate = useNavigate();
  const [job, setDetail] = useState([]);
  const [exist, setExist] = useState("");
  const [jobs, setjobs] = useState([]);
  const [data, setData] = useState({
    id: "",
    jobid: "",
  });

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
      setData({
        id: localStorage.getItem("user_id"),
        jobid: localStorage.getItem("id"),
      });
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    loadapplied();
  }, []);

  const submitFile = async () => {
    const { id, jobid } = data;
    try {
      const response = await fetch(
        `https://jobfinder-godfreds-projects.vercel.app/upload-files`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }
      );
      const jsonData = await response.json();
      document.getElementById("apply1").style.backgroundColor =
        "rgb(205, 205, 205)";
      document.getElementById("apply1").textContent = "Applied";
      document.getElementById("apply1").disabled = true;
      toast.success("Application Successful");
    } catch (err) {
      console.error(err.message);
    }
  };

  const loadjobs = async () => {
    const id = localStorage.getItem("id");
    const userid = localStorage.getItem("user_id");
    try {
      const response = await fetch(
        `https://jobfinder-godfreds-projects.vercel.app/details/${id}/${userid}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );
      const jsonData = await response.json();
      const applicationExists = jsonData.applicationExists;
      setDetail(jsonData);
      setExist(applicationExists);

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

  const handleclick = (id) => {
    if (id === "apply1") {
      if (document.querySelector(".mymodal").style.display !== "flex")
        document.querySelector(".mymodal").style.display = "flex";
      document.getElementById("overlay").style.display = "block";
    }
    if (id === "close") {
      document.querySelector(".mymodal").style.display = "none";
      document.getElementById("overlay").style.display = "none";
    }
  };

  return (
    <div className="Jobdetail">
      <Dashboardnav />

      <div className="detail-container" key={job.job_id}>
        <h2>{job.nome_job}</h2>
        <div className="location">
          <h4>Location</h4>
          <div className="posizione">
            <img id="posizione" src={logo} alt="" />
            <h5>{job.location}</h5>
          </div>
        </div>
        <div className="location">
          <h4>Azienda</h4>
          <div className="posizione">
            <img id="posizione" src={logo1} alt="" />
            <h5>{job.company_name}</h5>
          </div>
        </div>
        <div className="location">
          <h4>Descrizione</h4>
          <div className="posizione description">
            <p>{job.descrizione}</p>
          </div>
        </div>

        {job.job_status === "open" ? (
          exist ? (
            <button id="closed" disabled>
              Applied
            </button>
          ) : (
            <button id="apply1" onClick={() => submitFile()}>
              Apply
            </button>
          )
        ) : (
          <button id="closed" disabled>
            Closed
          </button>
        )}
      </div>

      <Contact />
    </div>
  );
};

export default Jobdetail;
