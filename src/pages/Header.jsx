import React from "react";
import JobSearch from "./JobSearch";
import Navbar from "./Navbar";
import Contact from "./Contact";
import logo from "./images/logo.png";
import close from "./images/close.svg";
import { redirect, useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  const redirect = () => {
    navigate("/login");
  };

  return (
    <div className="header">
      <section id="homepage">
        <Navbar />
        <div className="header-detail">
          <h3>4536+ Jobs Listed</h3>
          <h2>Find Your Dream Job</h2>
          <p>We provide you with opportunities inline with your skills.</p>
          <button onClick={() => redirect()}>Upload Resume</button>
        </div>
      </section>
      <section id="searchjob">
        <JobSearch />
      </section>
      <section id="contact">
        <Contact />
      </section>
    </div>
  );
};

export default Header;
