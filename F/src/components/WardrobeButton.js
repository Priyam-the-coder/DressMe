// components/WardrobeButton.js
import React from 'react';
import axios from 'axios';

function WardrobeButton({ setWardrobe, onClick, className }) {
  const fetchWardrobe = async () => {
    try {
      const response = await axios.post('/get_wardrobe');
      const { tops, bottoms, layers, swim_wr, one_piece } = response.data;

      // Dynamically get the IP address from the browser location
      const HOST = window.location.hostname;

      setWardrobe({
        tops: tops.map(item => `http://${HOST}:5000/${item.image}`),
        bottoms: bottoms.map(item => `http://${HOST}:5000/${item.image}`),
        layers: layers.map(item => `http://${HOST}:5000/${item.image}`),
        swimwear: swim_wr.map(item => `http://${HOST}:5000/${item.image}`),
        onePiece: one_piece.map(item => `http://${HOST}:5000/${item.image}`)
      });

      if (onClick) onClick();
    } catch (error) {
      console.error("Failed to fetch wardrobe:", error);
    }
  };

  return (
    <button onClick={fetchWardrobe} className={className}>
      My Wardrobe
    </button>
  );
}

export default WardrobeButton;
