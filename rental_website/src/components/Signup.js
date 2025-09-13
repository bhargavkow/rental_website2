import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "./Signup.css";
import Footer from "./Footer";
import Navbar from "./Navbar";
import stylehub4 from "../imges/stylehub4.png";

import clickSound from "../sound/beep-329314.mp3";

const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    age: "",
    gender: "",
    password: "",
    confirmPassword: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const audio = new Audio(clickSound);
    audio.play();

    if (formData.password !== formData.confirmPassword) {
      setErrorMessage("Passwords do not match!");
      return;
    }

    try {
      const response = await axios.post(
        "http://192.168.1.10:5000/auth/register",
        {
          first_name: formData.firstName,
          last_name: formData.lastName,
          phone_number: formData.phoneNumber,
          email: formData.email,
          age: parseInt(formData.age),
          gender: formData.gender,
          role: "user",
          password: formData.password,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response.status === 200 || response.status === 201) {
        const access_token = response.data.access_token;
        const refresh_token = response.data.refresh_token;

        localStorage.setItem("access_token", access_token);
        localStorage.setItem("refresh_token", refresh_token);

        navigate("/profile");
      }
    } catch (error) {
      console.error("Signup error:", error);
      if (error.response) {
        setErrorMessage(error.response.data.msg || "Signup failed!");
      } else {
        setErrorMessage("Server not reachable. Please try again later.");
      }
    }
  };

  return (
    <>
      <Navbar />
      <div className="login-main-container">
        <div className="loginimages-main-container">
          <img src={stylehub4} alt="Logo" />
        </div>

        <div className="signup-container">
          <form className="signup-form" onSubmit={handleSubmit}>
            <h2>Sign Up</h2>

            <div className="form-group">
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="First Name"
                required
              />
            </div>

            <div className="form-group">
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Last Name"
                required
              />
            </div>

            <div className="form-group">
              <input
                type="text"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                placeholder="Phone Number"
                required
              />
            </div>

            <div className="form-group">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                required
              />
            </div>

            <div className="form-group">
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
                placeholder="Age"
                required
              />
            </div>

            <div className="form-group">
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                required
                style={{ width: "320px", padding: "10px" }}
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="form-group">
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                required
              />
            </div>

            <div className="form-group">
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm Password"
                required
              />
            </div>

            {errorMessage && <p className="error-message">{errorMessage}</p>}

            <button type="submit">Register</button>
          </form>

          <div className="accept_term">
            By signing up, you agree to our{" "}
            <Link to="/Policy">Terms</Link> & <Link to="/Policy">Privacy Policy</Link>.
          </div>

          <div className="not-login-signup">
            <p>
              Already have an account? <Link to="/login">Login</Link>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Signup;
