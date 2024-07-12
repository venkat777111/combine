import React from "react";
import "./Consultation.css";
import { Link } from "react-router-dom";
import { Rating } from "@material-ui/lab";

const ExpertCard = ({ expert, index }) => {
  const options = {
    value: 4.5,
    readOnly: true,
    precision: 0.5,
  };

  return (
    <>
      <Link key={index} className="expertCard" to={`/`}>
        <img src={process.env.PUBLIC_URL + `${expert.image}`} alt="Profile" />
        <div className="name">{expert.name}</div>
        <div className="specialization">{expert.specialization}</div>
        <div className="experience">
          {expert.experience}+ years of experience
        </div>
        <Rating className="rating" {...options} />
      </Link>
    </>
  );
};

export default ExpertCard;
