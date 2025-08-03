import React from 'react';

function RecommendationButton({ setShowPromptBox, onClick, className }) {
  const handleClick = () => {
    setShowPromptBox(true);
    if (onClick) onClick();
  };

  return (
    <button onClick={handleClick} className={className}>
      My Look
    </button>
  );
}

export default RecommendationButton;
