import React from 'react';
import StockNewsItem from './stock_news_item';

import moment from 'moment';

const StockNewsIndex = ({ news, companyName }) => (
  <div className="news">
    <h1>{companyName} News</h1>
    <h3>{ moment(Date.now()).format('dddd MMMM Do YYYY') }</h3>
    <h4>Click headline for full story</h4>
    <ul className="story-list">
      {news.map(( story, idx ) =>
        <StockNewsItem
          key={idx}
          story={story}
          storyNumber={`story-${idx.toString()}`}/>
      )}
    </ul>
  </div>
);

export default StockNewsIndex;
