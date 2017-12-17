import React from 'react';
import ReactDOM from 'react-dom';

import configureStore from './store/store.js';

document.addEventListener('DOMContentLoaded', () => {

  const store = configureStore();

  // Testing Start //
  window.getState = store.getState;
  window.dispatch = store.dispatch;
  // Testing End //

  const root = document.getElementById('root');
  ReactDOM.render(<h1>BlueChip Test</h1>, root);
});
