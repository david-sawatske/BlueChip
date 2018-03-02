import React from 'react';

const SearchSuggestions = ({ filteredTickers }) => (
  <div className="search-suggestions">
    { filteredTickers.map((tkrData) => {
      const { name, symbol } = tkrData;
      
      return (
        <li key={symbol}>{name} - {symbol}</li>
      )
    })}
  </div>
);

export default SearchSuggestions;
