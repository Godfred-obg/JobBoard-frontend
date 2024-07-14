import React, { useEffect, useState } from "react";
import { Routes, Route, BrowserRouter, useNavigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Header from "./pages/Header";
import JobSearch from "./pages/JobSearch";
import Login from "./pages/Login";
import Register from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Jobdetail from "./pages/Jobdetail";
import Employer from "./pages/Employer";
import Candidates from "./pages/Candidates";
import logo from "./pages/images/logo.png";
import close from "./pages/images/close2.svg";
import { Link } from "react-scroll";
import "./App.css";
import "./responsive.css";

function FloatMenu() {
  const navigate = useNavigate();

  const float = () => {
    document.querySelector(".float").classList.add("slideout");
    document.querySelector(".float").classList.remove("float-position");
    document.querySelector(".float").classList.remove("slidein");
  };

  const redirect = () => {
    float();
    navigate("/login");
  };

  useEffect(() => {
    const handleResize = () => {
      const windowWidth = window.innerWidth;

      if (
        windowWidth >= 690 &&
        document.querySelector(".float").style.left === 0
      ) {
        float();
      }
    };
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="float">
      <div className="float-top">
        <div className="left-nav">
          <img src={logo} alt="" />
          <span>
            <h2>Job Board</h2>
            <p>Find your dream job</p>
          </span>
        </div>
        <img id="float-close" onClick={() => float()} src={close} alt="" />
      </div>

      <div className="float-links">
        <Link
          to="homepage"
          smooth={true}
          duration={500}
          onClick={() => float()}
        >
          Home
        </Link>
        <Link
          to="searchjob"
          smooth={true}
          duration={500}
          onClick={() => float()}
        >
          Browse Job
        </Link>
        <Link to="contact" smooth={true} duration={500} onClick={() => float()}>
          Contact
        </Link>

        <span onClick={redirect}>Log In</span>
        <button>
          <span onClick={redirect}>Post Job</span>
        </button>
      </div>
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <div className="overlay" id="overlay"></div>
      <BrowserRouter>
        <Toaster position="bottom-right" toastOptions={{ duration: 2000 }} />
        <Routes>
          <Route path="/" element={<Header />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/employer" element={<Employer />} />
          <Route path="/jobdetail" element={<Jobdetail />} />
          <Route path="/candidates" element={<Candidates />} />
        </Routes>
        <FloatMenu />
      </BrowserRouter>
    </div>
  );
}

export default App;
