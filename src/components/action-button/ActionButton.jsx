import React from 'react';
import './ActionButton.css'

const ActionButton = ({ icon, text, onClick }) => {
  return (
    <div className="action-button" onClick={onClick}>
      {icon}
      {text}
    </div>
  );
};

export default ActionButton;