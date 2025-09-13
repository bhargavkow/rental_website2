import React, { useState, useEffect } from "react";
import './Help.css';
import Footer from './Footer';
import Navbar from './Navbar';

const Help = () => {
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
            <div className="help-page">
                <h1 className="help-header">Customer Help Center</h1>

                <section className="help-faq-section">
                    <h2 className="help-faq-heading">FAQs</h2>
                    <div className="help-faq-container">
                        {faqsData.map((faq, index) => (
                            <div key={index} className="help-faq-item">
                                <button
                                    onClick={() => toggleAccordion(index)}
                                    className="help-faq-question-button"
                                >
                                    {faq.question}
                                </button>
                                {activeIndex === index && (
                                    <p className="help-faq-answer">{faq.answer}</p>
                                )}
                            </div>
                        ))}
                    </div>
                </section>


                <div className="section">
                    <h2>Shipping Information</h2>
                    <p>We offer free standard shipping on orders over $50. Orders typically ship within 2-3 business days.</p>
                    <p>For expedited shipping, we offer 2-day and next-day shipping options at checkout.</p>
                </div>

                <div className="section">
                    <h2>Returns & Exchanges</h2>
                    <p>Our return policy allows you to return items within 30 days of purchase. To initiate a return, please visit the "Returns" section in your account.</p>
                    <p>Exchanges are also accepted, provided the item is in new, unused condition.</p>
                </div>

                <div className="section">
                    <h2>Contact Us</h2>
                    <p>If you have any other questions, please don't hesitate to reach out:</p>
                    <p>Email: <a href="https://mail.google.com/mail/">Stylehub.support@gmail.com</a></p>
                    <p>Phone No: <a href="https://play.google.com/store/apps/details?id=com.google.android.contacts&hl=en_IN">+91 1234567890</a></p>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Help;
