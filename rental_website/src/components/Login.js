import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import axios from "axios";
import './Login.css';
import { useUser } from "./UserContext";
import stylehub4 from "../imges/stylehub4.png";
import Footer from './Footer';
import Navbar from './Navbar';


function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const { setUser } = useUser();
  const navigate = useNavigate();

  const location = useLocation();
  const message = location.state?.message;

  useEffect(() => {
    const storedAccessToken = localStorage.getItem("access_token");
    if (storedAccessToken) {

    }
  }, [navigate]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!email || !password) {
      setErrorMessage("Please enter both email and password.");
      return;
    }

    try {
      const response = await axios.post("http://192.168.1.10:5000/auth/login", {
        email: email,
        password: password,
        role: "user"
      },
        {
          headers: { "Content-Type": "application/json" },
        }
      );


      const access_token = response.data.access_token;
      const refresh_token = response.data.refresh_token;


      localStorage.setItem("access_token", access_token);
      localStorage.setItem("refresh_token", refresh_token);


      navigate("/profile");
    } catch (err) {
      setErrorMessage(err.response?.data?.msg || "Invalid credentials");
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const response = await axios.get("http://192.168.1.10:5000/auth/google/", {
      });

      // Backend returns { url: "https://accounts.google.com/..." }
      const redirectUrl = response.data.url;

      if (redirectUrl) {
        window.location.href = redirectUrl;
      } else {
        setErrorMessage("Google login failed. No redirect URL received.");
      }
    } catch (err) {
      console.error("Google login error:", err);
      setErrorMessage("Google login failed. Server not reachable.");
    }
  };

  return (
    <>
      <Navbar />
      
      <div className='login-main-container'>
        <div className='loginimages-main-container'>
          <img src={stylehub4} alt="Logo" />
        </div>

        <div className="login-container">
          <h2 className="login-heading">Login</h2>
          {message && <p className="info-message">{message}</p>}

          <form onSubmit={handleSubmit} className="login-form">
            <div className="login_form-group">
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input"
                placeholder='Email'
                required
              />
            </div>
            <div className="login_form-group">
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input"
                placeholder='Password'
                required
              />
            </div>

            {errorMessage && <p className="error-message">{errorMessage}</p>}

            <button type="submit" className="button">Login</button>

            <div className='or'>or</div>

            <div className='login_with_google'>
              <button type="button" onClick={handleGoogleLogin}>
                <i className="fa-brands fa-google"></i> Login with Google
              </button>
            </div>

            <div className="not-login-signup">
              <p>Don't have an account? <Link to="/signup">Sign up</Link></p>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Login;
