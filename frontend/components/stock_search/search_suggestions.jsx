import React from 'react';

const SearchSuggestions = ({ filteredTickers, updateTicker }) => (
  <div className="search-suggestions">
    <ul>
      { filteredTickers.map((tkrData) => {
        const { name, symbol } = tkrData;
        return <li key={symbol}
                   onClick={ (e) => updateTicker(symbol, e) }>
                 {name} - {symbol}
               </li>
      })}
    </ul>
  </div>
);

export default SearchSuggestions;
