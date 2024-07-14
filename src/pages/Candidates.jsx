import React, { useState, useEffect } from "react";
import Dashboardnav from "./Dashboardnav";
import logo from "./images/head.svg";
import Contact from "./Contact";

const Candidates = () => {
  const [job, setDetail] = useState([]);
  const [hasCandidates, setHasCandidates] = useState(false);

  const loadjobs = async () => {
    const id = localStorage.getItem("id");
    try {
      const response = await fetch(
        `https://jobfinder-godfreds-projects.vercel.app/candidates/${id}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );
      const jsonData = await response.json();
      setDetail(jsonData);

      if (jsonData.length === 0) {
        document.getElementById("nocandidates").style.display = "block";
        setHasCandidates(false);
      } else {
        console.log("Account not found");
        localStorage.setItem("pos", jsonData[0].nome_job);
        document.querySelector(".candidatelist").style.display = "flex";
        setHasCandidates(true);
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    loadjobs();
  }, []);

  return (
    <div className="candidates">
      <Dashboardnav />
      <div className="candidates-container">
        <div id="nocandidates">
          <h3>No candidates applied yet</h3>
        </div>

        <div className="candidatelist">
          <h2 id="nomejob">{localStorage.getItem("pos")} candidates</h2>
          {job.map((candidate) => (
            <div className="job" key={candidate.job_id} id="candidate">
              <div id="left-side-job" className="left">
                <img src={logo} id="company-icon" alt="company-icon" />
                <div className="job-details" id="list">
                  <h5 id="candidatename">
                    {candidate.nome} {candidate.cognome}
                    <span> ({candidate.email})</span>
                  </h5>
                  <a
                    href="https://myjobboard.netlify.app/cv.pdf"
                    id="resume"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Resume
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Contact />
    </div>
  );
};

export default Candidates;
