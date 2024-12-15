import React, { useState } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
function Login({ setLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // Handle username input change
  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  // Handle password input change
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  // Handle login click
  const handleLogin = async () => {
    if (username && password) {
      try {
        // Make a POST request to the loginUser endpoint
        console.log("AXIOS POST");
        const response = await axios.post("http://localhost:3000/api/login", {
          username,
          password,
        });
        console.log("AXIOS RESPONSE", response);

        if (response.data.success) {
          // Save the username in localStorage and update login state
          let userName = response.data.data.username;
          let userType = response.data.data.userType;
          localStorage.setItem("user", JSON.stringify({ userName }));
          localStorage.setItem("userType", JSON.stringify({ userType }));
          setLogin(true);
        } else {
          alert("Invalid User name or Password"); // Show error message from backend
        }
      } catch (error) {
        console.log("ERROR:", error);
        alert(error.message);
      }
    } else {
      alert("Please fill in both fields.");
    }
  };

  return (
    <div className="flex w-full h-full justify-center items-center">
      <div className="flex flex-col gap-2 items-center justify-center h-[500px] w-1/2 border">
        <p className="text-sm text-gray-400">Login</p>

        {/* Username Input */}
        <div className="h-12 p-0 m-0 max-w-sm min-w-[200px]">
          <input
            type="text"
            name="username"
            className="flex w-full bg-transparent placeholder:text-slate-400 text-xs border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
            placeholder="User Name"
            value={username}
            onChange={handleUsernameChange}
          />
        </div>

        {/* Password Input */}
        <div className="h-12 p-0 m-0 max-w-sm min-w-[200px]">
          <input
            type="password"
            name="password"
            className="flex w-full bg-transparent placeholder:text-slate-400 text-xs border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
            placeholder="Password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>

        {/* Buttons */}
        <div className="flex flex-row gap-2">
          <div
            className="flex text-center justify-center p-2 rounded-lg h-10 border bg-green-900 text-white cursor-pointer"
            onClick={handleLogin}
          >
            Login
          </div>
          <div className="flex text-center justify-center p-2 rounded-lg h-10 border bg-red-900 text-white">
            Cancel
          </div>
        </div>
        <div className="text-gray-400">
          New user ? <NavLink className="text-blue-700" to="/register">Click Here</NavLink>
        </div>
      </div>
    </div>
  );
}

export default Login;
