import React from "react";
import './Footer.css'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <div className="footer_main_container">

      <div className="footer_container">

        <div className="footer_first">
          <h2>
            <a href="/" className="footer-logo">STYLE HUB</a>
          </h2>
          <p>
            Our website provides many types of rental services across the
            country. StyleHub is the most trusted website in this field!!!
          </p>
        </div>

        <div className="footer_second">
          <h2>CATEGORIES</h2>
          <ul>
            <li><Link to="/Men">Men</Link></li>
            <li><Link to="/Women">Women</Link></li>
            <li><Link to="/Children">Children</Link></li>
            <li><Link to="/Tranding">Tranding</Link></li>
          </ul>
        </div>

        <div className="footer_third">
          <h2>DETAIL</h2>
          <ul>
            <li><Link to="/About_us">About Us</Link></li>
            <li><Link to="/ContactUS">ContactUs</Link></li>
            <li><Link to="/Policy">Policy</Link></li>
            <li><Link to="/Help">Help</Link></li>
          </ul>
        </div>

        <div className="footer_four">
          <h2>SOCIAL MEDIA</h2>
          <ul>
            <li>
              <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
                <i className="fa-brands fa-instagram"></i> Instagram
              </a>
            </li>
            <li>
              <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">
                <i className="fa-brands fa-facebook"></i> Facebook
              </a>
            </li>
            <li>
              <a href="https://x.com/" target="_blank" rel="noopener noreferrer">
                <i className="fa-brands fa-x-twitter"></i> Twitter
              </a>
            </li>
            <li>
              <a href="https://www.google.com/" target="_blank" rel="noopener noreferrer">
                <i className="fa-brands fa-google"></i> Google
              </a>
            </li>
          </ul>
        </div>

        <div className="footer_five">
          <h2>CONTACT</h2>
          <ul>
            <li>
              <a 
                href="https://play.google.com/store/apps/details?id=com.google.android.contacts&hl=en_IN" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <i className="fa-solid fa-phone"></i> +91 1234567890
              </a>
            </li>
            <li>
              <a 
                href="https://www.google.com/maps/place/Sankalp+Square+3B/@23.0435266,72.4809431,18z/data=!3m1!4b1!4m6!3m5!1s0x395e9b7aff4e20c1:0xeca4a5aa065bcbc3!8m2!3d23.0435253!4d72.481641!16s%2Fg%2F11h9y5bfwf?entry=ttu&g_ep=EgoyMDI1MDgyNS4wIKXMDSoASAFQAw%3D%3D" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <i className="fa-solid fa-location-dot"></i> Shindhu Bhavan Road, Ahmedabad.
              </a>
            </li>
            <li>
              <a 
                href="https://mail.google.com/mail/" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <i className="fa-solid fa-envelope"></i> StyleHub.support@gmail.com
              </a>
            </li>
          </ul>
        </div>

      </div>

      <div className="footer_rights">
        <p>
          <i className="fa-solid fa-copyright"></i> All rights reserved by StyleHub.
        </p>
      </div>

    </div>
  )
}

export default Footer;
