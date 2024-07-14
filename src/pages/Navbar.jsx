import React, { useEffect, useState } from "react";
import logo from "./images/logo.png";
import menu from "./images/menu.svg";
import Login from "./Login";
import { Link as RouterLink } from "react-router-dom";
import { Link, Element, animateScroll as scroll } from "react-scroll";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const handleScroll = () => {
      const navbar = document.querySelector(".navbar");
      if (navbar) {
        if (window.scrollY > 0) {
          navbar.classList.add("scrolled");
        } else {
          navbar.classList.remove("scrolled");
        }
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const redirect = () => {
    navigate("/login");
  };
  const float = () => {
    document.querySelector(".float").classList.remove("slideout");
    document.querySelector(".float").classList.add("slidein");
    document.querySelector(".float").classList.add("float-position");
  };

  return (
    <div className="navbar">
      <div className="left-nav">
        <img src={logo} alt="" />
        <span>
          <h2>Job Board</h2>
          <p>Find your dream job</p>
        </span>
      </div>
      <div className="middle-nav">
        <div className="links">
          <ul>
            <Link to="homepage" smooth={true} duration={500}>
              Home
            </Link>
            <Link to="searchjob" smooth={true} duration={500}>
              Browse Job
            </Link>
            <Link to="contact" smooth={true} duration={500}>
              Contact
            </Link>
          </ul>
        </div>
      </div>
      <div className="right-nav">
        <span onClick={() => redirect()}>Log In</span>
        <button>
          <span onClick={() => redirect()}>Post Job</span>
        </button>
      </div>
      <img id="menu" onClick={() => float()} src={menu} alt="" />
    </div>
  );
};
export default Navbar;
