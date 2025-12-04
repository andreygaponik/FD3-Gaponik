import React from 'react';
import ReactDOM from 'react-dom';

import FilterHook from './components/FilterHook';

const arrayOfStrings = [
  'california',
  'everything',
  'aboveboard',
  'washington',
  'basketball',
  'weathering',
  'characters',
  'literature',
  'contraband',
  'appreciate',
];

ReactDOM.render(
  <FilterHook arrayOfStrings={arrayOfStrings} />,
  document.getElementById('container'),
);
