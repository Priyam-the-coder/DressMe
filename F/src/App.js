import React, { useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import LoginForm from './components/LoginForm';
import WardrobeButton from './components/WardrobeButton';
import RecommendationButton from './components/RecommendationButton';
import ImageAccordion from './components/ImageCarousel';
import Footer from './components/Footer';
import SplashScreen from './components/SplashScreen';
import PromptBox from './components/PromptBox';
import ImageCarousel from './components/MyLookCarousel';

// 👇 Add this helper
const getBaseUrl = () => {
  return window.location.hostname === 'localhost'
    ? 'http://localhost:3000'
    : `http://${window.location.hostname}:3000`;
};

function App() {
  const [theme, setTheme] = useState('light');
  const [wardrobe, setWardrobe] = useState({
    tops: [], bottoms: [], layers: [], swimwear: [], onePiece: []
  });
  const [recommendations, setRecommendations] = useState([]);
  const [showSplash, setShowSplash] = useState(true);
  const [form, setForm] = useState({ name: '', password: '', age: '', gender: '', prompt: '' });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showPromptBox, setShowPromptBox] = useState(false);
  const [prompt, setPrompt] = useState('');
  const [activeTab, setActiveTab] = useState('wardrobe');

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (form.name && form.password) {
      fetch(`${getBaseUrl()}/register_and_login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: form.name, password: form.password })
      })
        .then(res => {
          if (!res.ok) throw new Error("Registration or authentication failed");
          return res.json();
        })
        .then(() => setIsLoggedIn(true))
        .catch(err => alert("Login failed: " + err.message));
    } else {
      alert("Please enter both username and password.");
    }
  };

  const handlePromptSubmit = () => {
    fetch(`${getBaseUrl()}/get_recommendation`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: form.name,
        password: form.password,
        prompt: prompt
      })
    })
      .then(res => res.json())
      .then(data => {
        if (data.recommended_set) {
          setRecommendations(data.recommended_set);
          setActiveTab('look');
        } else {
          alert("No recommendations found.");
        }
      })
      .catch(err => {
        console.error("Failed to fetch recommendation:", err);
        alert("Recommendation failed: " + err.message);
      });
  };

  if (showSplash) {
    return <SplashScreen onFinish={() => setShowSplash(false)} />;
  }

  return (
    <div className={`App ${theme}`}>
      <Navbar toggleTheme={toggleTheme} theme={theme} />
      <div className="page-wrapper">
        <div className="main-content">
          {!isLoggedIn ? (
            <LoginForm form={form} setForm={setForm} handleLoginSubmit={handleLoginSubmit} />
          ) : (
            <>
              <div className="buttons">
                <WardrobeButton
                  setWardrobe={setWardrobe}
                  onClick={() => setActiveTab('wardrobe')}
                  className={activeTab === 'wardrobe' ? '' : 'inactive'}
                />
                <RecommendationButton
                  setShowPromptBox={setShowPromptBox}
                  onClick={() => setActiveTab('look')}
                  className={activeTab === 'look' ? '' : 'inactive'}
                />
              </div>

              {activeTab === 'wardrobe' && Object.values(wardrobe).some(arr => arr.length > 0) && (
                <div className="wardrobe-section">
                  <h1>My Wardrobe</h1>
                  {wardrobe.tops.length > 0 && (
                    <ImageAccordion images={wardrobe.tops} title="Topwear" theme={theme} />
                  )}
                  {wardrobe.bottoms.length > 0 && (
                    <ImageAccordion images={wardrobe.bottoms} title="Bottomwear" theme={theme} />
                  )}
                  {wardrobe.layers.length > 0 && (
                    <ImageAccordion images={wardrobe.layers} title="Layers" theme={theme} />
                  )}
                  {wardrobe.swimwear.length > 0 && (
                    <ImageAccordion images={wardrobe.swimwear} title="Swimwear" theme={theme} />
                  )}
                  {wardrobe.onePiece.length > 0 && (
                    <ImageAccordion images={wardrobe.onePiece} title="One Piece" theme={theme} />
                  )}
                </div>
              )}

              {activeTab === 'look' && (
                <>
                  {showPromptBox && (
                    <PromptBox
                      prompt={prompt}
                      setPrompt={setPrompt}
                      handleSubmit={handlePromptSubmit}
                      theme={theme}
                    />
                  )}

                  {recommendations.length > 0 && (
                    <div className="recommendation-section">
                      <h2>Recommended Looks:</h2>
                      <ImageCarousel
                        images={recommendations.map((set, index) => {
                          const imageMap = {
                            topwear: [],
                            bottomwear: [],
                            layers: [],
                            swimwear: [],
                            onePiece: []
                          };
                          set.items.forEach(img => {
                            const category = img.category.toLowerCase();
                            const url = `${getBaseUrl()}/${img.image}`;
                            let normalized = category === 'one-piece' ? 'onePiece'
                              : category === 'layer' ? 'layers'
                              : category;
                            if (imageMap[normalized]) imageMap[normalized].push(url);
                          });
                          return imageMap;
                        })}
                        theme={theme}
                      />
                    </div>
                  )}
                </>
              )}
            </>
          )}
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default App;
