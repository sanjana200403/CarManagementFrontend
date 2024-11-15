import React from 'react';

const SearchForm = () => {
  return (
    <form className="search-form">
      <input type="text" placeholder="Location" />
      <input type="text" placeholder="Car Brand" />
      <input type="text" placeholder="Car Model" />
      <input type="text" placeholder="Pick-Up & Return Date" />
      <button type="submit">Search</button>
    </form>
  );
};

export default SearchForm;
