import React, { useState } from 'react';
import './MyLookCarousel.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleChevronLeft, faCircleChevronRight } from '@fortawesome/free-solid-svg-icons';


function ImageCarousel({ images }) {
  const [currentPage, setCurrentPage] = useState(0);

  const totalPages = images.length;

  const nextSlide = () => {
    setCurrentPage((prevPage) => (prevPage + 1) % totalPages);
  };

  const prevSlide = () => {
    setCurrentPage((prevPage) => (prevPage - 1 + totalPages) % totalPages);
  };

  const getCurrentLook = () => images[currentPage];

  if (!images || images.length === 0) return null;

  return (
    <div className="carousel-container">
      <h2>Look {currentPage + 1}</h2>
      <button className="carousel-button left" onClick={prevSlide}>
  <FontAwesomeIcon icon={faCircleChevronLeft} size="2x" />
</button>
      <div className="carousel-slides structured-slide">
        <div className="stacked-slide">
          <div className="row topwear-row">
            {getCurrentLook().topwear?.map((img, idx) => (
              <img key={`top-${idx}`} src={img} alt="Topwear" />
            ))}
          </div>
          <div className="row bottomwear-row">
            {getCurrentLook().bottomwear?.map((img, idx) => (
              <img key={`bottom-${idx}`} src={img} alt="Bottomwear" />
            ))}
          </div>
          <div className="row onepiece-row">
            {getCurrentLook().onePiece?.map((img, idx) => (
              <img key={`onepiece-${idx}`} src={img} alt="One Piece" />
            ))}
          </div>
          <div className="row layer-row">
            {getCurrentLook().layers?.map((img, idx) => (
              <img key={`layer-${idx}`} src={img} alt="Layer" />
            ))}
          </div>
          <div className="row swimwear-row">
            {getCurrentLook().swimwear?.map((img, idx) => (
              <img key={`swimwear-${idx}`} src={img} alt="Swimwear" />
            ))}
          </div>
        </div>
      </div>
      <button className="carousel-button right" onClick={nextSlide}>
  <FontAwesomeIcon icon={faCircleChevronRight} size="2x" />
</button>
      <div className="carousel-dots">
        {Array.from({ length: totalPages }).map((_, idx) => (
          <span
            key={idx}
            className={`dot ${idx === currentPage ? 'active' : ''}`}
            onClick={() => setCurrentPage(idx)}
          />
        ))}
      </div>
    </div>
  );
}

export default ImageCarousel;