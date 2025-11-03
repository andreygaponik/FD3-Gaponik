import React from 'react';

import './Shop.css';
import Products from './Products';

class Shop extends React.Component {
  state = {
    shopData: this.props.shopData,
  };

  deleteProduct = (id) => {
    const confirmDelete = confirm('Действительно удалить товар?');

    if (confirmDelete) {
      this.setState((prevState) => {
        return {
          shopData: prevState.shopData.filter((product) => product.id !== id),
        };
      });
    }
  };

  render() {
    return (
      <div className="shop">
        <h1>{this.props.name}</h1>
        <h2>{this.props.address}</h2>

        <Products shopData={this.state.shopData} deleteProductHandler={this.deleteProduct} />
      </div>
    );
  }
}

export default Shop;
