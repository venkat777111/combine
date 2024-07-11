import React from "react";
import "./Consultation.css";
import ExpertCard from "./ExpertCard";

const Consultation = ({ experts }) => {
  return (
    <>
      <h2 className="productsHeading">Our Experts</h2>
      <div className="container">
        {experts.map((expert, index) => (
          <ExpertCard expert={expert} index={index} />
        ))}
      </div>
    </>
  );
};

export default Consultation;
