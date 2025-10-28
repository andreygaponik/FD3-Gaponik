import React from 'react';

import './Shop.css';
import Products from './Products';

class Shop extends React.Component {
  render() {
    return (
      <div className="shop">
        <h1>{this.props.name}</h1>
        <h2>{this.props.address}</h2>

        <Products shopData={this.props.shopData} />
      </div>
    );
  }
}

export default Shop;
