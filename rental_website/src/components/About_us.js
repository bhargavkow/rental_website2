import React from 'react';
import './About_us.css';
import img1 from '../imges/homepage_img.jpeg';
import img2 from '../imges/homepage_img2.jpeg';
import Footer from './Footer';
import Navbar from './Navbar';

const AboutUs = () => {
  return (
    <>
    <Navbar/>
      <div className="about-us-container">
        <header className="about-us-header">
          <h1>Our Story</h1>
          <p className="subtitle">
            Driven by a passion for quality and craft.
          </p>
        </header>

        <section className="about-us-content">
          <div className="story-block">
            <div className="text-content">
              <h2>The Beginning</h2>
              <p>
                It all started in 2020 with a simple idea: to create a curated
                collection of clothes that blends timeless design with
                modern functionality. We saw a gap in the market for products that
                were not only beautiful but also built to last, and so, StyleHub was born.
              </p>
            </div>
            <div className="image-content">
              <img src={img2} alt="Founder" className="founder-image" />
            </div>
          </div>

          <div className="mission-block">
            <h2>Our Mission</h2>
            <div className="values-grid">
              <div className="value-card">
                <h3>Quality First</h3>
                <p>We believe in the power of well-made goods. Our products are meticulously sourced and crafted with an unwavering commitment to quality and durability.</p>
              </div>
              <div className="value-card">
                <h3>Customer Trust</h3>
                <p>Your satisfaction is our top priority. We're dedicated to providing an exceptional shopping experience and building a community of loyal customers.</p>
              </div>
              <div className="value-card">
                <h3>Sustainable Growth</h3>
                <p>We are committed to ethical and sustainable practices, from our supply chain to our packaging. We believe business can be a force for good.</p>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />

    </>
  );
};

export default AboutUs;
