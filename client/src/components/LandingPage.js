import React, { Component } from 'react'
import NavBarLandingPage from './NavBarLandingPage'
import IntroSection from './IntroSection';
import AboutSection from './AboutSection';
import ArticleAlpha from "./ArticleAlpha";

export default class LandingPage extends Component {
    constructor(){
        super();
        // console.log('we are at the landing page');
    }
    render() {
        return (
            <div>
                <NavBarLandingPage expand="lg"></NavBarLandingPage>
                <IntroSection/>
                <AboutSection/>
                <ArticleAlpha/>

            </div>
        )
    }
}
