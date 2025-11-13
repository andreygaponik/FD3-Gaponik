import React from 'react';

class ProductDetails extends React.Component {
  // handleInputChange = (event) => {};

  render() {
    return (
      <div className="product-details">
        <h2>Edit existing Product</h2>

        <p>Title: {this.props.editedProduct[0].title}</p>
        <p>Price: {this.props.editedProduct[0].price}</p>
      </div>
    );
  }
}

export default ProductDetails;
