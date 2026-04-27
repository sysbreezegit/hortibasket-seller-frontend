import React from 'react';

interface LoadingScreenProps {
  message?: string;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({
  message = "Preparing your CareMall experience..."
}) => {
  return (
    <div className="caremall-loading">
      <div className="loading-logo">
        <img 
          src="/svgs/care-logo.svg" 
          alt="CareMall" 
          className="logo-image"
        />
        <h1>CareMall</h1>
      </div>
      
      <div className="loading-spinner"></div>
      
      <p className="loading-message">{message}</p>
      
      <div className="loading-features">
        <span>❤️ Curated with Care</span>
        <span>🚚 Fast Delivery</span>
        <span>🔒 Secure Shopping</span>
      </div>
    </div>
  );
};

export default LoadingScreen;