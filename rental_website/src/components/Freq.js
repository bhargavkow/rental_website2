import React, { useState } from 'react';
import './Freq.css';

const faqsData = [
  {
    question: "What is StyleHUb?",
    answer: "StyleHub is provide cloth for affortable rent price."
  },
  {
    question: "StyleHub is provide service in india?",
    answer: "Yes, Stylehub is provide service in 15 state in india."
  },
  {
    question: "can i buy cloth from StyleHub?",
    answer: "Yes, Style also provide this service. you can buy any clothes in this site."
  }
];

function Freq() {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
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
  );
}

export default Freq;
