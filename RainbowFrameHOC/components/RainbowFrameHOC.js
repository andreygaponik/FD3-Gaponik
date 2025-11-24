import React from 'react';

import './RainbowFrameHOC.css';

class DoubleButton extends React.Component {
  render() {
    return (
      <div className="buttons">
        <input type="button" value={this.props.caption1} onClick={() => this.props.cbPressed(1)} />
        {this.props.children}
        <input type="button" value={this.props.caption2} onClick={() => this.props.cbPressed(2)} />
      </div>
    );
  }
}

function withRainbowFrame(colors) {
  return function Borders(Component) {
    return class extends React.Component {
      render() {
        let content = <Component {...this.props}>{this.props.children}</Component>;

        colors.forEach((el) => {
          content = <div style={{ border: `5px solid ${el}`, margin: '5px' }}>{content}</div>;
        });

        return content;
      }
    };
  };
}

const colors = ['red', 'orange', 'yellow', 'green', '#00BFFF', 'blue', 'purple'];
const FramedDoubleButton = withRainbowFrame(colors)(DoubleButton);

class RainbowFrameHOC extends React.Component {
  render() {
    return (
      <FramedDoubleButton caption1="я из лесу" caption2="мороз" cbPressed={(num) => alert(num)}>
        вышел, был сильный
      </FramedDoubleButton>
    );
  }
}
export default RainbowFrameHOC;
