import React from 'react';
import ReactDOM from 'react-dom';

import Filter from './components/Filter';

const arrayOfStrings = ['asd', 'california', 'everything', 'aboveboard', 'washington', 'basketball', 'weathering', 'characters', 'literature', 'contraband', 'appreciate'];

ReactDOM.render(
  <Filter arrayOfStrings={arrayOfStrings} />,
  document.getElementById('container'),
);
