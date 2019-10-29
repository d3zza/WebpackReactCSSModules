import './style/global.scss';

import React from 'react';
import { render } from 'react-dom';
import App from './component/App';

const onDOMReady = () => {
  console.log('onDOMReady');
  document.body.classList.remove('loading');
  document.documentElement.className = document.documentElement.className.replace('no-js', 'js');
  render(<App />, document.getElementById('app'));
};

if (document.readyState === 'interactive' || document.readyState === 'complete') {
  onDOMReady();
} else {
  document.addEventListener('DOMContentLoaded', onDOMReady, false);
}

if (module.hot) {
  module.hot.accept();
}
