import React from 'react';
import ReactDOM from 'react-dom';

import Shop from './components/Shop';

import shopData from './shopData.json';

ReactDOM.render(
  <Shop name="Apple store" address="Address" shopData={shopData} />,
  document.getElementById('container'),
);
