import React, { useState } from 'react';
import './PromptBox.css';

const suggestionsList = [
  "I want office outfits",
  "I want outfits for interview in red",
  "I need office party look in pink",
  "Outfit for date in red and add layer",
  "I need outfit for hoome ritual avoid red",
  "I need outfit for temple visit",
  "I need outfit for cultural event and add a layer",
  "I need outfits for Goa trip",
  "I need outfits for Manali vacation",
  "I need outfits for a traditional visit",
  "I need swimming outfit",
  "I need outfit for picnic",
  "I need outfit for shopping outing in blue",
  "I need outfit for evening walk in green and add a layer",
  "I need outfit for wedding",
  "I need outfit for business meeting",
  "Suggest me a look for a party",
  "I need outfit for office ethnic day",
  "I need outfit for hiking",
  "I need outfit for gym"
];

function PromptBox({ prompt, setPrompt, handleSubmit, theme }) {
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleChange = (e) => {
    const userInput = e.target.value;
    setPrompt(userInput);

    const matches = suggestionsList.filter(suggestion =>
      suggestion.toLowerCase().includes(userInput.toLowerCase())
    );

    setFilteredSuggestions(matches);
    setShowSuggestions(userInput.length > 0);
  };

  const handleSuggestionClick = (suggestion) => {
    setPrompt(suggestion);
    setFilteredSuggestions([]);
    setShowSuggestions(false);
  };

  return (
    <div className={`prompt-container ${theme === 'dark' ? 'dark-theme' : 'light-theme'}`}>
      <div className="input-button-wrapper">
        <div className="input-wrapper">
          <input
            type="text"
            className={`neumorphic-input ${theme === 'dark' ? 'dark-input' : 'light-input'}`}
            placeholder="What's on your mind?"
            value={prompt}
            onChange={handleChange}
            onFocus={() => setShowSuggestions(prompt.length > 0)}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
          />
          {showSuggestions && filteredSuggestions.length > 0 && (
            <ul className={`suggestions-list ${theme === 'dark' ? 'dark-dropdown' : 'light-dropdown'}`}>
              {filteredSuggestions.map((suggestion, index) => (
                <li key={index} onClick={() => handleSuggestionClick(suggestion)}>
                  <span className="suggestion-icon">🔍</span>
                  <span className="suggestion-text">{suggestion}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
        <button className="neumorphic-button" onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
}

export default PromptBox;
