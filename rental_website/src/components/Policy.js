import React from 'react';
import './Policy.css';
import Navbar from './Navbar';
import Footer from './Footer';

const Policy = () => {
  return (
    <>
      <Navbar/>
      <div className="policy-container">
        <h1>E-commerce Policies</h1>

        <section className="policy-section">
          <h2>Privacy Policy</h2>
          <p>Your privacy is important to us. This policy explains how we collect, use, and protect your personal information when you use our website. We collect data such as your name, email address, shipping address, and payment details to process orders and improve your shopping experience. We do not share your information with third parties except as necessary for order fulfillment or legal requirements.</p>
        </section>

        <section className="policy-section">
          <h2>Terms of Service</h2>
          <p>By using our website, you agree to comply with and be bound by the following terms and conditions of use. These terms govern your use of our website and the services offered. This includes rules regarding user conduct, intellectual property, disclaimers of warranties, and limitations of liability.</p>
        </section>

        <section className="policy-section">
          <h2>Refund and Return Policy</h2>
          <p>We offer a [Number]-day return policy for most items purchased on our website. To be eligible for a return, your item must be unused and in the same condition that you received it. It must also be in the original packaging. Refunds will be processed within [Number] business days of receiving the returned item.</p>
        </section>

        <section className="policy-section">
          <h2>Shipping Policy</h2>
          <p>We aim to process and ship all orders within [Number] business days. Shipping times may vary depending on your location and the selected shipping method. We offer various shipping options, including standard and expedited shipping. Tracking information will be provided once your order has shipped.</p>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default Policy;