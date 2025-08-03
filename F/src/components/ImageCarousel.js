import React, { useState } from 'react';
import './ImageCarousel.css'; // Or rename to ImageAccordion.css if needed

function ImageAccordion({ images = [], title = "Section", theme = 'light' }) {
  const [isOpen, setIsOpen] = useState(false);

  if (!images || images.length === 0) return null;

  return (
    <div className={`accordion-container ${theme}`}>
      <div className="accordion-header" onClick={() => setIsOpen(!isOpen)}>
        <h3>{title}</h3>
        <span>{isOpen ? '▲' : '▼'}</span>
      </div>

      {isOpen && (
        <div className="accordion-content">
          <div className="image-grid">
            {images.map((item, index) => (
              <div key={index} className="image-tile">
                <img src={item} alt={`Look ${index + 1}`} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default ImageAccordion;
