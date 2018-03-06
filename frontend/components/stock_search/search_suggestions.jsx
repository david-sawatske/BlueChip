import React from 'react';

const SearchSuggestions = ({ filteredTickers }) => (
  <div className="search-suggestions">
    <ul>
      { filteredTickers.map((tkrData) => {
        const { name, symbol } = tkrData;

        return (
          <li key={symbol}>{name} - {symbol}</li>
        )
      })}
    </ul>
  </div>
);

export default SearchSuggestions;
