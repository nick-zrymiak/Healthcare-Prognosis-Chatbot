import React, { Component } from 'react'
import NavBar from './NavBar'
import IntroSection from './IntroSection';

export default class LandingPage extends Component {
    constructor(){
        super();
        // console.log('we are at the landing page');
    }
    render() {
        return (
            <div>
                <NavBar expand="lg"></NavBar>
                <IntroSection/>
                
            </div>
        )
    }
}
