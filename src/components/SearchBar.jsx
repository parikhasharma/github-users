import React, { useState } from 'react';
import './searchbar.css'

const SearchBar = ({ handleSearch }) => {
  const [username, setUsername] = useState('');

  const handleChange = (e) => {
    setUsername(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch(username);
  };

  return (
    <div className="search-bar-container">
    <form onSubmit={handleSubmit}>
      <input type="text" value={username} onChange={handleChange} placeholder="Enter GitHub username" />
      <button type="submit">Search</button>
    </form>
  </div>
  );
};

export default SearchBar;
