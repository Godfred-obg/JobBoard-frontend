import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const extractTokenFromCookies = (cookies) => {
    // Example implementation - you may need to parse and extract the 'token' cookie
    const cookieParts = cookies.split(";");
    for (let part of cookieParts) {
      const cookiePair = part.split("=");
      const cookieName = cookiePair[0].trim();
      if (cookieName === "token") {
        return cookiePair[1];
      }
    }
    return null; // Return null if 'token' cookie not found
  };

  const loginUser = async (e) => {
    e.preventDefault();
    const { email, password } = data;
    try {
      const response = await fetch(
        "https://jobfinder-godfreds-projects.vercel.app/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }
      );
      const jsonData = await response.json();
      localStorage.setItem("token", jsonData);
      localStorage.setItem("login", true);
      const token = localStorage.getItem("token");
      if (!token) {
        return null; // Handle case where there is no token
      }

      try {
        // Decode the token
        const decodedToken = jwtDecode(token);
        const userId = decodedToken.email; // Adjust according to your token's structure
        localStorage.setItem("user_id", decodedToken.id);

        if (decodedToken.stato === "employer") {
          localStorage.setItem("company", decodedToken.company);
          navigate("/employer");
        } else navigate("/dashboard");
      } catch (error) {
        console.error("Invalid token", error);
      }

      if (jsonData.error) {
        toast.error(jsonData.error);
      } else {
        const cookies = response.headers.get("set-cookie");
        if (cookies) {
          // 'cookies' will contain the set-cookie header value, which may include multiple cookies
          //console.log("Cookies received:", cookies);
          // Extract the token from cookies if needed
          const token = extractTokenFromCookies(cookies);
          //console.log("Token extracted:", token);
        }
        setData({});
        toast.success("Login Successful");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const redirect = () => {
    navigate("/signup");
  };

  return (
    <div className="login">
      <form action="" onSubmit={loginUser}>
        <h4>LOGIN</h4>
        <input
          type="text"
          placeholder="Email"
          value={data.email}
          onChange={(e) => setData({ ...data, email: e.target.value })}
        />
        <input
          type="password"
          name=""
          id=""
          placeholder="Password"
          value={data.password}
          onChange={(e) => setData({ ...data, password: e.target.value })}
        />
        <button>LOGIN</button>
        <p>
          Not registered?{" "}
          <span onClick={() => redirect()}>Create an account.</span>
        </p>
      </form>
    </div>
  );
};

export default Login;
