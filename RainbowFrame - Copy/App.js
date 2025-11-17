import React from 'react';
import ReactDOM from 'react-dom';

import Br2jsx from './components/Br2jsx';

let colors = ['red', 'orange', 'yellow', 'green', '#00BFFF', 'blue', 'purple'];

ReactDOM.render(<Br2jsx colors={colors}>Hello!</Br2jsx>, document.getElementById('container'));
