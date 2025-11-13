import React from 'react';

class Product extends React.Component {
  render() {
    return (
      <tr
        className={this.props.isActive ? 'active' : undefined}
        onClick={() => this.props.onProductSelect(this.props.id)}>
        <td>{this.props.title}</td>
        <td>{this.props.id}</td>
        <td>{this.props.price}$</td>
        <td>{this.props.stock}</td>
        <td>{this.props.image}</td>
        <td>
          <button
            onClick={(e) => {
              e.stopPropagation();
              this.props.onProductDelete(this.props.id);
            }}>
            delete
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              this.props.onProductEdit(this.props.id);
            }}>
            edit
          </button>
        </td>
      </tr>
    );
  }
}

export default Product;
