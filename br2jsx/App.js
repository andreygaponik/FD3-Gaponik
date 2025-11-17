import React from 'react';
import ReactDOM from 'react-dom';

import Br2jsx from './components/Br2jsx';

const text = 'первый<br>второй<br/>третий<br />последний';
const test = 'первый,второй,третий,последний';

ReactDOM.render(<Br2jsx text={text} />, document.getElementById('container'));
