import React, { useEffect } from 'react';
import './SplashScreen.css';

function SplashScreen({ onFinish }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onFinish();
    }, 3000);  // 3 seconds splash

    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div className="splash-container">
      <img src="/logo512.png" alt="DressMe Logo" className="splash-logo" />
      <h1 className="splash-title">DressMe</h1>
    </div>
  );
}

export default SplashScreen;
