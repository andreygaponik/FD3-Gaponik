import React from 'react';

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
                onProductSelect={this.props.handleProductSelect}
                onProductDelete={this.props.handleProductDelete}
                onProductEdit={this.props.handleProductEdit}
              />
            ))}
        </tbody>
      </table>
    );
  }
}

export default Products;
