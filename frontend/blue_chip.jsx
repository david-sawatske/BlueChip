import React from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';

import Root from './components/root';

import configureStore from './store/store.js';

document.addEventListener('DOMContentLoaded', () => {
  let store;

  if (window.currentUser) {
    const preloadedState = { session: { currentUser: window.currentUser } };
    store = configureStore(preloadedState);
    delete window.currentUser;
  } else {
    store = configureStore();
  }

  // Testing Start //
  window.getState = store.getState;
  window.dispatch = store.dispatch;
  // Testing End //

  const root = document.getElementById('root');
  Modal.setAppElement(document.container);
  ReactDOM.render(<Root store={ store }/>, root);
});
