import React, { useEffect, useState } from "react";
import "./Profile.css";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "./UserContext";
import Footer from "./Footer";
import axios from "axios";
import Navbar from './Navbar';

const Profile = () => {
  const { user, setUser } = useUser();
  const [profileData, setProfileData] = useState(user);
  const navigate = useNavigate();

  useEffect(() => {

   
      axios
        .get("http://192.168.1.10:5000/auth/profile", {
          headers: {
            "Content-Type": "application/json",
          
            
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        })
        .then((res) => {
          setProfileData(res.data);
        })
        .catch((err) => {
          console.error("Error fetching profile:", err);
        });
    
  }, []);


  return (
    <>
    <Navbar/>
      <h1 className="profile-heading">User Profile</h1>
      <div className="profile-main-container">
        <div className="middle-container">
          <div className="profile-left">
            <h2>Hello, {profileData?.first_name}!</h2>
            <ul className="profile-nav-links">
              <li>
                <Link to="/Bag">
                  <i className="fa-solid fa-cart-shopping"></i> Your Bag
                </Link>
              </li>
              <li>
                <Link to="/Favorite">
                  <i className="fa-regular fa-heart"></i> Favorite
                </Link>
              </li>
              <li>
                <Link to="/Men">Men</Link>
              </li>
              <li>
                <Link to="/Women">Women</Link>
              </li>
              <li>
                <Link to="/Children">Children</Link>
              </li>
              <li>
                <Link to="/Trending">Trending</Link>
              </li>
              <li>
                <Link to="/Confirmorder">Confirm Order</Link>
              </li>
            </ul>
            <section className="profile-actions">
              {/* <button onClick={handleLogout} className="profile-logout-button">
                Log Out
              </button> */}
            </section>
          </div>

          <div className="profile-container">
            <header className="profile-header">
              <h2>Personal Information</h2>
              <p className="profile-name">
                Name: {profileData?.first_name}
              </p>
              <p className="profile-email">Email: {profileData?.email}</p>
              <p className="profile-age">Age: {profileData?.age}</p>
              <p className="profile-phone">Phone: {profileData?.phone_number || "not found"}</p>
              <p className="profile-gender">Gender: {profileData?.gender}</p>

              <div className="profile-faq">
                <h2>FAQs</h2>
                <h3>
                  What happens when I update my email address (or mobile
                  number)?
                </h3>
                <p>
                  Your login email id (or mobile number) changes, likewise.
                  You'll receive all your account related communication on your
                  updated email address (or mobile number).
                </p>
                <h3>
                  When will my StyleHub account be updated with the new email
                  address (or mobile number)?
                </h3>
                <p>
                  It happens as soon as you confirm the verification code sent
                  to your email (or mobile) and save the changes.
                </p>
                <h3>
                  What happens to my existing StyleHub account when I update my
                  email address (or mobile number)?
                </h3>
                <p>
                  Updating your email address (or mobile number) doesn't
                  invalidate your account. Your account remains fully
                  functional. You'll continue seeing your Order history, saved
                  information and personal details.
                </p>
              </div>
            </header>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Profile;


