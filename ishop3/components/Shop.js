import React from 'react';
import PropTypes from 'prop-types';

import './Shop.css';
import Products from './Products';
import ProductInfo from './ProductInfo';
import ProductDetails from './ProductDetails';
import AddProduct from './AddProduct';

class Shop extends React.Component {
  state = {
    shopData: this.props.shopData,
    activeProductId: null,
    selectedProduct: null,
    cardMode: '',
    hasChanges: false,
  };

  handleProductDelete = (id) => {
    const confirmDelete = confirm('Действительно удалить товар?');

    if (confirmDelete) {
      this.setState((prevState) => {
        return {
          shopData: prevState.shopData.filter((product) => product.id !== id),
        };
      });
    }
  };

  handleOpenProductCard = (id, mode) => {
    const product = this.state.shopData.find((product) => product.id === id);

    this.setState({
      activeProductId: id,
      cardMode: mode,
      selectedProduct: product,
    });
  };

  handleProductAdd = (product) => {
    this.setState((prevState) => {
      return {
        shopData: [...prevState.shopData, product],
        hasChanges: false,
      };
    });
  };

  handleProductEditSave = (updatedProduct) => {
    this.setState((prevState) => {
      return {
        shopData: prevState.shopData.map((product) =>
          product.id === updatedProduct.id ? updatedProduct : product,
        ),
        hasChanges: false,
      };
    });
  };

  showProductAddForm = () => {
    this.setState({
      activeProductId: null,
      selectedProduct: null,
      cardMode: 'add',
    });
  };

  resetCardMode = () => {
    this.setState({
      cardMode: '',
      hasChanges: false,
    });
  };

  showProductInfo = (product) => {
    this.setState({
      selectedProduct: product,
      cardMode: 'edit',
    });
  };

  getChangesStatus = (hasChanges) => {
    this.setState({
      hasChanges,
    });
  };

  render() {
    return (
      <div className="shop">
        <h1>{this.props.name}</h1>
        <h2>{this.props.address}</h2>
        <Products
          shopData={this.state.shopData}
          handleProductDelete={this.handleProductDelete}
          handleOpenProductCard={this.handleOpenProductCard}
          activeProductId={this.state.activeProductId}
          hasChanges={this.state.hasChanges}
        />
        {(this.state.cardMode === 'edit' || this.state.cardMode === 'add') && (
          <AddProduct
            onAddProduct={this.handleProductAdd}
            cardMode={this.state.cardMode}
            selectedProduct={this.state.selectedProduct}
            onEditProduct={this.handleProductEditSave}
            getChangesStatus={this.getChangesStatus}
            onResetCardMode={this.resetCardMode}
            key={this.state.cardMode === 'edit' ? this.state.selectedProduct.id : 'add'}
          />
        )}
        {this.state.cardMode !== 'add' && this.state.cardMode !== 'edit' && (
          <button
            onClick={() => {
              this.showProductAddForm();
            }}>
            Add new product
          </button>
        )}
        {this.state.cardMode === 'select' && (
          <ProductInfo selectedProduct={this.state.selectedProduct} />
        )}
      </div>
    );
  }
}

export default Shop;
