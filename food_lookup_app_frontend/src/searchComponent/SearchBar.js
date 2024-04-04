// Search.js
import React, { useState } from 'react';
import './SearchBar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';


function SearchBar({ onSearch }) {
  const [inputValue, setInputValue] = useState('');

  const handleChange = (e) => {
    const value = e.target.value;
    
    setInputValue(value);
    onSearch(value);
  };

  return (
    <div className="food-search-bar">
      <FontAwesomeIcon icon={faSearch} className="search-icon" />
      <input
        className="search-input"
        type="text"
        placeholder="Search food by name"
        value={inputValue}
        onChange={handleChange} 
      />
    </div>
  );
}

export default SearchBar;
