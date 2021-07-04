import React, { Component } from 'react';
import introImage from '../images/intro-image.png';

export default class IntroSection extends Component {
    render() {
        return (
            <section className="introSection">
                <div className="textSubSection">
                    <h3>IntroSection</h3>
                    <p>Some dummy text here about the intro</p>
                </div>

                <div className='imgSubSection'>
                    <img src={introImage} width='280px' alt='brain-intro-img'/>
                </div>
            </section>
        )
    }
}
