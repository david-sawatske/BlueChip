import React from 'react';
import moment from 'moment'

const StockNewsItem = ({ story }) => (
  <div>
    <h6>{moment(story.datetime).calendar()} from {story.source}</h6>
    <a href={story.url}>{story.headline}</a>
    <p>{story.summary}</p>
  </div>
);

export default StockNewsItem;
