import React from 'react';
import './ContactUs.css';
import { FaMapMarkerAlt, FaPhone, FaEnvelope } from 'react-icons/fa';
import Navbar from './Navbar';
import Footer from './Footer';

const ContactUs = () => {
  return (
    <>
      <Navbar />
      <div className="contact-container">
        <header className="contact-header">
          <h1>Contact Us</h1>
          <p>Feel free to reach out to us with any questions or inquiries.</p>
        </header>

        <div className="contact-details-standalone">
          <h2>Contact Information</h2>
          <div className="detail-item">
            <FaEnvelope className="detail-icon" />
            <a href="https://mail.google.com/mail/">Stylehub.support@gmail.com</a>
          </div>
          <div className="detail-item">
            <FaPhone className="detail-icon" />
            <a href="https://play.google.com/store/apps/details?id=com.google.android.contacts&hl=en_IN">+91 1234567890</a>
          </div>
          <div className="detail-item">
            <FaMapMarkerAlt className="detail-icon" />
            <a href='https://www.google.com/maps/place/Sankalp+Square+3B/@23.0435266,72.4809431,18z/data=!3m1!4b1!4m6!3m5!1s0x395e9b7aff4e20c1:0xeca4a5aa065bcbc3!8m2!3d23.0435253!4d72.481641!16s%2Fg%2F11h9y5bfwf?entry=ttu&g_ep=EgoyMDI1MDgyNS4wIKXMDSoASAFQAw%3D%3D'>Shindhu Bhavan Road, Ahmedabad</a>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default ContactUs;
