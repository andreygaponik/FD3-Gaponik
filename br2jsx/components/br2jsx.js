import React from 'react';

import './Br2jsx.css';

class Br2jsx extends React.Component {
  render() {
    const replacesBr = this.props.text.replace(/<br\s*\/?>/g, '<br>').split(/(<br>)/g);

    return (
      <div className="br2jsx">{replacesBr.map((item) => (item === '<br>' ? <br /> : item))}</div>
    );
  }
}

export default Br2jsx;
