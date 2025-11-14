import React from 'react';
import PropTypes from 'prop-types';

import Product from './Product';

class Products extends React.Component {
  render() {
    return (
      <table className="products">
        <thead>
          <tr>
            <th>Title</th>
            <th>Id</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Image</th>
          </tr>
        </thead>

        <tbody>
          {this.props.shopData &&
            this.props.shopData.map((product) => (
              <Product
                title={product.title}
                price={product.price}
                stock={product.stock}
                image={product.img}
                key={product.id}
                id={product.id}
                isActive={this.props.activeProductId === product.id}
                onProductDelete={this.props.handleProductDelete}
                onOpenProductCard={this.props.handleOpenProductCard}
                hasChanges={this.props.hasChanges}
              />
            ))}
        </tbody>
      </table>
    );
  }
}

export default Products;
