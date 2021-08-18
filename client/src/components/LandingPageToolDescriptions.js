import React from "react";
import heartImage from "./../images/ct-scan-heart.jpg";
import chatbotImage from "./../images/chatbot.png";
import mriImange from "./../images/head-mri.jpg";

export function HeartDiseaseCard() {
  return (
    <div className="parent-article">
      <div className="article"  >
        <div className="left-img-article">
          <img src={heartImage} width="280px" alt="brain-intro-img" />
        </div>
        <div className="right-text-article">
          <h2>LDA Heart Disease Tool</h2>
          <div className='article-underline'></div>
          <h5>See if you are at risk of heart disease with just 13 questions</h5>
          <p>
            Using the 13 data points provided the LDA Heart Disease Tool can use linear discriminant analysis to draw an optimal threshold. Predictions made with this threshold have an accuracy ~86%.
          </p>
        </div>
      </div>
    </div>
  );
}

export function NLPChatBotCard() {
  return (
    <div className="parent-article">
      <div className="article"  >
        <div className="left-img-article">
          <img src={chatbotImage} width="280px" alt="brain-intro-img" />
        </div>
        <div className="right-text-article">
          <h2>NLP ChatBot for Sypmtoms</h2>
          <div className='article-underline'></div>
          <h5>Describe your symptoms and the chatbot will give you a list of possible causes and their likelyhoods</h5>
          <p>
            The Chatbot takes in a natural human explanation of their symptoms as a string and uses natural language processing to extract relevant information. The information is then fed into another model that provides a list of potential diagnosis and their probability values.
          </p>
        </div>
      </div>
    </div>
  );
}

export function MRICard() {
  return (
    <div className="parent-article">
      <div className="article"  >
        <div className="left-img-article">
          <img src={mriImange} width="280px" alt="brain-intro-img" />
        </div>
        <div className="right-text-article">
          <h2>MRI Disease Predictor</h2>
          <div className='article-underline'></div>
          <h5>Upload an MRI of the brain to determine if it is cancerous</h5>
          <p>
            The Predictor script takes in a Brain MRI JPEG as input and uses a Transfer Learning Convectional Neural Network to produce a potential diagnosis.
          </p>
        </div>
      </div>
    </div>
  );
}
