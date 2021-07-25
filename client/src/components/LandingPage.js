import React, { Component, useRef, useState, useEffect } from "react";
import NavBarLandingPage from "./NavBarLandingPage";
import IntroSection from "./IntroSection";
import StatsRow from "./StatsRow";
import ArticleAlpha from "./ArticleAlpha";

export default function LandingPage() {




  




  return (
    <div>
      <div>
        <NavBarLandingPage expand="lg"></NavBarLandingPage>
        <IntroSection />
        <StatsRow />
        {/* <div ref={ref} >{isVisible && console.count('im on screen')}</div> */}
        <ArticleAlpha />
      </div>
    </div>
  );
}
