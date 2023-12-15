import React from "react";

function AboutData({ heading, text, textItems }) {
  return (
    <section className="about-section py-5">
      <div className="container">
        <h2 className="section-title">{heading}</h2>
        <div className="row">
          <div className="col-md-8 offset-md-2">
            <div className="text-center">
              {text && <p className="text">{text}</p>}
              {textItems && (
                <ul className="text">
                  {textItems.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        .text {
          width: 100%;
          max-width: 1000px;
          margin: 0 auto;
        }
      `}</style>
    </section>
  );
}

export default AboutData;
