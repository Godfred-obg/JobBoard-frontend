import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();

  // Initialize state with default values
  const [data, setData] = useState({
    name: "",
    surname: "",
    email: "",
    password: "",
    stato: "employee", // Set default value
    company: "",
  });

  const [selectedOption, setSelectedOption] = useState("employee"); // Set default value

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
    setData({ ...data, stato: event.target.value });
  };

  const registerUser = async (e) => {
    e.preventDefault();
    const { name, surname, email, password, stato } = data;
    try {
      const response = await fetch(
        "https://jobfinder-godfreds-projects.vercel.app/signup",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }
      );
      const jsonData = await response.json();
      if (jsonData.error) {
        toast.error(jsonData.error);
      } else {
        setData({
          name: "",
          surname: "",
          email: "",
          password: "",
          stato: "employee", // Reset to default value
          company: "",
        });
        setSelectedOption("employee"); // Reset to default value
        toast.success("Signup Successful");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const redirect = () => {
    navigate("/login");
  };

  return (
    <div className="signup">
      <form action="" onSubmit={registerUser}>
        <h4>SIGN UP</h4>
        <input
          type="text"
          placeholder="Name..."
          value={data.name}
          onChange={(e) => setData({ ...data, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Surname..."
          value={data.surname}
          onChange={(e) => setData({ ...data, surname: e.target.value })}
        />
        <input
          type="text"
          placeholder="Email..."
          value={data.email}
          onChange={(e) => setData({ ...data, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password..."
          value={data.password}
          onChange={(e) => setData({ ...data, password: e.target.value })}
        />

        <div className="stato">
          <div className="radio">
            <input
              type="radio"
              id="option1"
              value="employee"
              onChange={handleOptionChange}
              checked={selectedOption === "employee"}
            />
            <h5>Employee</h5>
          </div>
          <div className="radio">
            <input
              type="radio"
              id="option2"
              value="employer"
              onChange={handleOptionChange}
              checked={selectedOption === "employer"}
            />
            <h5>Employer</h5>
          </div>
        </div>
        <input
          type="text"
          placeholder="Company name..."
          value={data.company}
          onChange={(e) => setData({ ...data, company: e.target.value })}
        />

        <button>SIGNUP</button>
        <p>
          Already registered? <span onClick={redirect}>Login</span>
        </p>
      </form>
    </div>
  );
};

export default Signup;
