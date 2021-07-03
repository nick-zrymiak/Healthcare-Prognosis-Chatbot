import React, { Component } from 'react'
import NavBar from './NavBar'
// import {Container} from 'react-bootstrap'

export default class LandingPage extends Component {
    constructor(){
        super();
        console.log('we are at the landing page');
    }
    render() {
        return (
            <div>
                {/* <Container> */}
                <NavBar expand="lg"></NavBar>

                {/* </Container> */}
                <h3>This is the landing page</h3>
                
            </div>
        )
    }
}
