import React from 'react';

import './Shop.css';

class Shop extends React.Component {
  render() {
    return (
      <div className="shop">
        <h1>{this.props.name}</h1>
        <h2>{this.props.address}</h2>
      </div>
    );
  }
}

export default Shop;
