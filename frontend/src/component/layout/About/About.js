import React from "react";
import "./About.css";
import { Button, Typography, Avatar } from "@material-ui/core";
const About = () => {
  const visitGithub = () => {
    window.location = "https://github.com/shoebxsiddiqui/FarmoFlic";
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
              src={process.env.PUBLIC_URL + "/Shuaib.jpg"}
              alt="Founder"
            />
            <Typography>Mohd Shuaib Siddiqui</Typography>
            <Button onClick={visitGithub} color="primary">
              Visit Github
            </Button>
            <span>
              This Final Year project serves as both a learning opportunity and
              a platform for me to apply and enhance the skills I've developed,
              aiming to integrate new knowledge into practical development
            </span>
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
