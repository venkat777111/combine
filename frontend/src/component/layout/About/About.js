import React from "react";
import "./About.css";
import { Button, Typography, Avatar } from "@material-ui/core";
import Dbr from "../../../images/DB.jpg";

const About = () => {
  const visitGithub = () => {
    window.location = "https://github.com/venkat777111";
  };
  return (
    <div className="aboutSection">
      <div></div>
      <div className="aboutSectionGradient"></div>
      <div className="aboutSectionContainer">
        <Typography component="h1">About Us</Typography>

        <div>
          <div>
            <Avatar
              style={{ width: "10vmax", height: "10vmax", margin: "2vmax 0" }}
              src={process.env.PUBLIC_URL + `${Dbr}`}
              alt="Founder"
            />
            <Typography>VENKAT</Typography>
            <Button onClick={visitGithub} color="primary">
              Visit Github
            </Button>
            <span>Great Learning Experience with this kind of projects</span>
          </div>
          <div className="aboutSectionContainer2">
            <Typography component="h1">Our Services</Typography>
            <div>
              <div> Buy Products </div>
              <div> Sell Products </div>
              <div> 1-1 Consultation </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
