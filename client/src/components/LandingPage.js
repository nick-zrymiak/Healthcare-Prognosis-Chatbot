import React, { Component, useRef, useState, useEffect } from "react";
import NavBarLandingPage from "./NavBarLandingPage";
import IntroSection from "./IntroSection";
import StatsRow from "./StatsRow";
import ArticleAlpha from "./ArticleAlpha";
import axios from "axios";

export default function LandingPage() {

  useEffect(() => {
    console.log('useEffect from landing page');

    axios.get("http://localhost:8000/api/")
      .then(res =>{
        res = res.data;
        return JSON.stringify(res);
      })
      .then(output =>{
        console.log('output is from backend:' + output); 
      })
    
    return () => {
 
    }
  }, [])

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
