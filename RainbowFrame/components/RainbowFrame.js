import React from 'react';

import './RainbowFrame.css';

class RainbowFrame extends React.Component {
  render() {
    const colors = this.props.colors;
    let content = <div>{this.props.children}</div>;

    colors.forEach((item) => {
      return (content = (
        <div style={{ border: `5px solid ${item}`, padding: '5px' }}>{content}</div>
      ));
    });

    return content;
  }
}

export default RainbowFrame;
