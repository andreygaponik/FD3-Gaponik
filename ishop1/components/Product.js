import React from 'react';

class Product extends React.Component {
  render() {
    return (
      <tr>
        <td>{this.props.title}</td>
        <td>{this.props.price}$</td>
        <td>{this.props.stock}</td>
        <td>
          <img src={this.props.image} />
        </td>
      </tr>
    );
  }
}

export default Product;
