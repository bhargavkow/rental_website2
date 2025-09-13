import React, { useState, useEffect } from "react";
import "./Home.css";
import homepage_img4 from "../imges/homepage_img4.jpg";
import homepage_img5 from "../imges/homepage_img5.jpg";
import homepage_img6 from "../imges/homepage_img6.jpg";
import homepage_img7 from "../imges/homepage_img7.jpg";
import homepage_img8 from "../imges/homepage_img8.jpg";
import homepage_img9 from "../imges/homepage_img8.jpg";
import mumbai from "../imges/mumbai.png"
import surat from "../imges/surat.png"
import ahmedabad from "../imges/ahmedabad.png"
import pune from "../imges/pune.png"
import jaipur from "../imges/jaipur.png"
import chennai from "../imges/chennai.png"
import kolkata from "../imges/kolkata.png"
import hyderabad from "../imges/hyderabad.png"
import delhi from "../imges/delhi.png"
import bengluru from "../imges/bengluru.png"
import rajkot from "../imges/rajkot.png"
import ludhiyana from "../imges/ludhiyana.png"


import rental_img from "../imges/rental_img.png";
import rental_img2 from "../imges/rental_img2.png";
import plan from '../imges/3hr_delivery_icon.png';
import easy_return from '../imges/easy_return_icon.png';
import cod from '../imges/money.png';
import free_trail from '../imges/free_trial_icon.png';
import qc from '../imges/QC_icon.png';
import shipping from '../imges/shipping_both_ways_icon.png';


import men_categories from '../imges/men_categories.png';
import women_categories from '../imges/women_categories.png';
import children_categories from '../imges/children_categories.png';
import trending_categories from '../imges/trending_categories.png';
import offer_categories from '../imges/offer_categories.png';
import sale_categories from '../imges/sale_categories.png';



import '@fortawesome/fontawesome-free/css/all.min.css';
import Navbar from "./Navbar";
import Footer from "./Footer"; 

import Stylehubvideo from "./Stylehubvideo"
import About_us from "./About_us";

const Home = () => {
  // Carousel images
  const carouselImages = [
    homepage_img4,
    homepage_img5,
    homepage_img8,
    homepage_img9
  ];

  const [currentIndex, setCurrentIndex] = useState(0);


  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === carouselImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);
    return () => clearInterval(interval);
  }, [carouselImages.length]);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === carouselImages.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? carouselImages.length - 1 : prevIndex - 1
    );
  };

  // FAQs data
  const faqsData = [
    {
      question: "What is StyleHub?",
      answer: "StyleHub provides clothes at an affordable rental price."
    },
    {
      question: "Does StyleHub provide service in India?",
      answer: "Yes, StyleHub provides service in 15 states across India."
    },
    {
      question: "Can I buy clothes from StyleHub?",
      answer: "Yes, you can also buy clothes directly from the site."
    }
  ];

  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <>

      <Navbar/>
      {/* Carousel Section */}

      <div className="carousel">
        <button className="carousel-btn prev" onClick={prevSlide}>
          &#10094;
        </button>
        <img
          src={carouselImages[currentIndex]}
          alt={`Slide ${currentIndex + 1}`}
          className="carousel-image"
        />
        <button className="carousel-btn next" onClick={nextSlide}>
          &#10095;
        </button>

        <div className="carousel-dots">
          {carouselImages.map((_, index) => (
            <span
              key={index}
              className={`dot ${index === currentIndex ? "active" : ""}`}
              onClick={() => setCurrentIndex(index)}
            ></span>
          ))}
        </div>
      </div>

      {/* Services Section */}

      <div className="service_container">
        <div className="servic"><img src={plan} alt="Plan" /><p>All India Delivery</p></div>
        <div className="servic"><img src={easy_return} alt="Easy Return" /><p>Quality Check</p></div>
        <div className="servic"><img src={cod} alt="COD" /><p>COD (Advance)</p></div>
        <div className="servic"><img src={qc} alt="Quality Check" /><p>Certified</p></div>
        <div className="servic"><img src={free_trail} alt="Free Trial" /><p>Free Trial</p></div>
        <div className="servic"><img src={shipping} alt="Shipping" /><p>Shipping</p></div>
      </div>

      {/* Categories Section */}
      <div className="main_categories_container">
        <div className="categories_header">
          <h1>CATEGORIES</h1>
        </div>
        <div className="categories_container">
          <a href="/Men"><div className="categories_img_description"><img src={men_categories} alt="Lehenga" /></div></a>
          <a href="/Women"><div className="categories_img_description"><img src={women_categories} alt="Gown" /></div></a>
          <a href="/Children"><div className="categories_img_description"><img src={children_categories} alt="Anarkali" /></div></a>
          <a href="/Tranding"><div className="categories_img_description"><img src={trending_categories} alt="Sherwani" /></div></a>
          <a href="/Men"><div className="categories_img_description"><img src={offer_categories} alt="Indo Western" /></div></a>
          <a href="/Men"><div className="categories_img_description"><img src={sale_categories} alt="Tuxedo" /></div></a>
        </div>
      </div>


      {/* Rental Section */}
      <div className="rentalpage_container">
        <a href="/Help"><img src={rental_img} alt="Rental 1" /></a>
        <a href="/Men"><img src={rental_img2} alt="Rental 2" /></a>

      </div>

      <section className="gallery-section">
        <h1 className="gallery-heading">Location</h1>
        <div className="gallery-container">
          {/* Column 1 */}
          <div className="gallery-column">

            <img src={mumbai} alt="Gown" />
            <img src={surat} alt="Anarkali" />
            <img src={ahmedabad} alt="Sherwani" />
          </div>

          {/* Column 2 */}
          <div className="gallery-column">

            <img src={pune} alt="Tuxedo" />
            <img src={chennai} alt="Lehenga 2" />
            <img src={kolkata} alt="Gown 2" />
          </div>

          {/* Column 3 */}
          <div className="gallery-column">

            <img src={delhi} alt="Sherwani 2" />
            <img src={ludhiyana} alt="Indo Western 2" />
            <img src={bengluru} alt="Tuxedo 2" />
          </div>

          {/* Column 4 */}
          <div className="gallery-column">

            <img src={jaipur} alt="Sherwani 2" />
            <img src={rajkot} alt="Indo Western 2" />
            <img src={hyderabad} alt="Tuxedo 2" />
          </div>
        </div>
      </section>

      {/* <Stylehubvideo/> */}

      {/* FAQ Section */}
      <section className="faq-section">
        <h2 className="faq-heading">FAQs</h2>
        <div className="faq-container">
          {faqsData.map((faq, index) => (
            <div key={index} className="faq-item">
              <button
                onClick={() => toggleAccordion(index)}
                className="faq-question-button"
              >
                {faq.question}
              </button>
              {activeIndex === index && (
                <p className="faq-answer">{faq.answer}</p>
              )}
            </div>
          ))}
        </div>
      </section>


      {/* Footer */}
      <Footer />
    </>
  );
};

export default Home;