import React, { Component } from 'react'
import NavBarLandingPage from './NavBarLandingPage'
import IntroSection from './IntroSection';
import AboutSection from './AboutSection';

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
            </div>
        )
    }
}
