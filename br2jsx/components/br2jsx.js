import React from 'react';

import './Br2jsx.css';

class Br2jsx extends React.Component {
  render() {
    const replacesBr = this.props.text.split(/(<br\s*\/?>)/g);

    return (
      <div className="br2jsx">
        {replacesBr.map((item, index) => (item.startsWith('<br') ? <br key={index} /> : item))}
      </div>
    );
  }
}

export default Br2jsx;
