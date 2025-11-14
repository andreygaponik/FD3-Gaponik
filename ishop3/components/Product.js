import React from 'react';

class Product extends React.Component {
  render() {
    return (
      <tr
        className={this.props.isActive ? 'active' : undefined}
        onClick={() => {
          if (!this.props.hasChanges) {
            this.props.onOpenProductCard(this.props.id, 'select');
          }
        }}>
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
            }}
            disabled={this.props.hasChanges}>
            delete
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              this.props.onOpenProductCard(this.props.id, 'edit');
            }}
            disabled={this.props.hasChanges}>
            edit
          </button>
        </td>
      </tr>
    );
  }
}

export default Product;
