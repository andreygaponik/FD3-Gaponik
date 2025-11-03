import React from 'react';

import Product from './Product';

class Products extends React.Component {
  state = {
    activeProductId: null,
  };

  productSelect = (id) => {
    this.setState({ activeProductId: id });
  };

  render() {
    return (
      <table className="products">
        <thead>
          <tr>
            <th>Title</th>
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
                isActive={this.state.activeProductId === product.id}
                productSelectHandler={this.productSelect}
                deleteProductHandler={this.props.deleteProductHandler}
              />
            ))}
        </tbody>
      </table>
    );
  }
}

export default Products;
