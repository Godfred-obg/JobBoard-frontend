import React, { useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import logo from "./images/logo.png";
import user from "./images/user.svg";
import JobSearch from "./JobSearch";
import { useNavigate } from "react-router-dom";

const Dashboardnav = () => {
  const navigate = useNavigate();

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

  if (!token) {
    return null; // Handle case where there is no token
  }

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="navbar" id="dashboard-nav">
      <div className="left-nav">
        <img src={logo} alt="" />
        <span>
          <h2>Job Board</h2>
          <p>Find your dream job</p>
        </span>
      </div>
      <div className="right-nav-dashboard">
        <img src={user} alt="" id="user" onClick={toggleHeight} />
        <div className="profile">
          <h5 id="name">{nome.toLocaleUpperCase()}</h5>
          <h5 id="logout" onClick={() => logout()}>
            LOGOUT
          </h5>
        </div>
      </div>
    </div>
  );
};

export default Dashboardnav;
