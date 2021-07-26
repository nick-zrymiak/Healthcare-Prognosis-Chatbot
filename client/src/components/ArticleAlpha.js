import React from "react";
import mriImage from "./../images/head-mri.jpg";
import VanillaTilt from "vanilla-tilt";
import Tilt from 'react-vanilla-tilt'

export default function ArticleAlpha() {
  return (
    <div className="parent-article">
      <div className="article"  >
        <div className="left-img-article">
          <img src={mriImage} width="280px" alt="brain-intro-img" />
        </div>
        <div className="right-text-article">
          <h2>Brain MRI</h2>
          <div className='article-underline'></div>
          <h5>SUB TEXT FOR BRAIN MRI</h5>
          <p>
            Proident laborum ullamco irure qui aliquip sit dolor elit labore voluptate duis. Et est et excepteur occaecat voluptate elit id. Irure consectetur exercitation nisi consectetur mollit incididunt laborum pariatur cupidatat laborum aliquip. Qui laborum id proident ad veniam ad esse excepteur eiusmod nulla aute. Fugiat veniam culpa adipisicing Lorem. Esse exercitation sint nulla ut consectetur velit laboris et.
          </p>
        </div>
      </div>
    </div>
  );
}
