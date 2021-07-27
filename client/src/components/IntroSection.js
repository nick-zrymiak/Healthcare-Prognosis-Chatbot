import React, { Component } from "react";
// import introImage from "../images/intro-image.png";
import LandingHeartBeatAnim from "./LandingHeartBeatAnim";
import Tilt from "react-vanilla-tilt";

export default class IntroSection extends Component {
  render() {
    return (
      <section className="introSection">
        <div className="textSubSection textDecorator">
          <h5>Get Resutls in just 3 easy steps:</h5>
          <div className="underline"></div>
          <h4>&emsp; 1. Create an Account with Us</h4>
          <h4>&emsp; 2. Upload Relavent Data</h4>
          <h4>&emsp; 3. Choose an Analysis Tool</h4>
        </div>

        <div className="imgSubSection">
          <Tilt
            style={{
              height: "400px",
              backgroundColor: "rgba(160, 17, 17, 0.2)",
              borderRadius: "50%",
            }}
            options={{ 
              "max-glare": 23232, 
              max: 360, 
              scale: 0.1,
              perspective: 2323,
              transition:        false,
              glare:             true, 
              easing:            "cubic-bezier(.03,.98,.52,.99)"
            }}
          >
            <LandingHeartBeatAnim />
          </Tilt>
        </div>
      </section>
    );
  }
}

/*
{
    reverse:           false,  // reverse the tilt direction
    max:               35,     // max tilt rotation (degrees)
    perspective:       1000,   // Transform perspective, the lower the more extreme the tilt gets.
    scale:             1,      // 2 = 200%, 1.5 = 150%, etc..
    speed:             300,    // Speed of the enter/exit transition
    transition:        true,   // Set a transition on enter/exit.
    axis:              null,   // What axis should be disabled. Can be X or Y.
    reset:             true    // If the tilt effect has to be reset on exit.
    easing:            "cubic-bezier(.03,.98,.52,.99)",    // Easing on enter/exit.
    glare:             false   // if it should have a "glare" effect
    "max-glare":       1,      // the maximum "glare" opacity (1 = 100%, 0.5 = 50%)
    "glare-prerender": false   // false = VanillaTilt creates the glare elements for you, otherwise
                               // you need to add .js-tilt-glare>.js-tilt-glare-inner by yourself
}

*/
