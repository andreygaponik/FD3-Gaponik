import React from 'react';

class Product extends React.Component {
  render() {
    return (
      <tr
        className={this.props.isActive ? 'active' : undefined}
        onClick={() => this.props.productSelectHandler(this.props.id)}>
        <td>{this.props.title}</td>
        <td>{this.props.price}$</td>
        <td>{this.props.stock}</td>
        <td>
          <img src={this.props.image} />
        </td>
        <td>
          <button
            onClick={(e) => {
              e.stopPropagation();
              this.props.deleteProductHandler(this.props.id);
            }}>
            delete
          </button>
        </td>
      </tr>
    );
  }
}

export default Product;
