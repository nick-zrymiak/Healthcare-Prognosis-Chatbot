import React from "react";
import mriImage from "./../images/head-mri.jpg";

export default function ArticleAlpha() {
  return (
    <div className="parent-article">
      <div className="article">
        <div className="left-img-article">
          <img src={mriImage} width="280px" alt="brain-intro-img" />
        </div>
        <div className="right-text-article">
          <h2>Brain MRI</h2>
          <div className='article-underline'></div>
          <h5>SUB TEXT FOR BRAIN MRI</h5>
          <p>
            A quick brown fox jumps over the lazy dog A quick brown fox jumps
            over the lazy dog A quick brown fox jumps over the lazy dog A quick
            brown fox jumps over the lazy dog A quick brown fox jumps over the
            lazy dog
          </p>
        </div>
      </div>
    </div>
  );
}
