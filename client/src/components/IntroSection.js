import React, { Component } from 'react';
import introImage from '../images/intro-image.png';

export default class IntroSection extends Component {
    render() {
        return ( 
            <section className="introSection">
                <div className="textSubSection">
                    <h3>Getting Started</h3>
                    <h5>
                        Get Result with just 3 steps:
                        <ol>
                            <li>Create an Account with Us</li>
                            <li>Upload Relavent Data</li>
                            <li>Choose an Analysis Tool</li>
                        </ol>
                    </h5>
                </div>

                <div className='imgSubSection'>
                    <img src={introImage} width='280px' alt='brain-intro-img'/>
                </div>
            </section>
        )
    } 
}
