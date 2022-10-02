import React from 'react';
import './PolygonImage.css'

const PolygonImage = ({ image }) => {
  return (
    <div className="polygon-card">
      <img src={image} alt="polygon" className="polygon-card__image"/>
    </div>
  );
};

export default PolygonImage;