import React, { Component } from "react";
import introImage from "../images/intro-image.png";
import LandingHeartBeatAnim from "./LandingHeartBeatAnim";

export default class IntroSection extends Component {
  render() {
    return (
      <section className="introSection">
        <div className="textSubSection textDecorator">
          <h5>Get Resutls in just 3 easy steps:</h5>
          <div className='underline'></div>
          <h4>&emsp; 1. Create an Account with Us</h4>
          <h4>&emsp; 2. Upload Relavent Data</h4>
          <h4>&emsp; 3. Choose an Analysis Tool</h4>
        </div>

        <div className="imgSubSection">
          {/* <img src={introImage} width='280px' alt='brain-intro-img'/> */}
          <LandingHeartBeatAnim />
        </div>
      </section>
    );
  }
}
