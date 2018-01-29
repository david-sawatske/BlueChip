import React from 'react';
import moment from 'moment';

const StockNewsItem = ({ story, storyNumber }) => (
  <div className={storyNumber}>
    <a href={story.url}>
      <h2>{story.headline}</h2>
    </a>
    <h6>{moment(story.datetime).calendar()} from {story.source}</h6>
    <p>{story.summary}</p>
  </div>
);

export default StockNewsItem;
