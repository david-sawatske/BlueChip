import React from 'react';
import StockNewsItem from './stock_news_item';

const StockNewsIndex = ({ news, companyName }) => (
  <div className="news">
    <h2>Latest {companyName} News</h2>
    <ul>
      {news.map(( story, idx ) =>
        <StockNewsItem
          key={idx}
          story={story} />
      )}
    </ul>
  </div>
);

export default StockNewsIndex;
