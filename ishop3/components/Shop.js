import React from 'react';
import PropTypes from 'prop-types';

import './Shop.css';
import Products from './Products';
import ProductInfo from './ProductInfo';
import ProductDetails from './ProductDetails';
import AddProduct from './AddProduct';

class Shop extends React.Component {
  static propTypes = {
    shopData: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        img: PropTypes.string.isRequired,
        stock: PropTypes.number.isRequired,
      }),
    ).isRequired,
  };

  state = {
    shopData: this.props.shopData,
    activeProductId: null,
    selectedProduct: null,
    isShowProductAdd: false,
    isShowProductInfo: false,
    isShowProductDetails: false,
  };

  handleProductSelect = (id) => {
    this.setState({ activeProductId: id });
    this.showProductInfo(this.state.shopData.filter((product) => product.id === id));
  };

  handleProductEdit = (id) => {
    this.setState({ activeProductId: id });
    this.showProductDetails(this.state.shopData.filter((product) => product.id === id));
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

  showProductInfo = (product) => {
    this.setState({
      selectedProduct: product,
      isShowProductInfo: true,
      isShowProductDetails: false,
    });
  };

  showProductDetails = (product) => {
    this.setState({
      selectedProduct: product,
      isShowProductInfo: false,
      isShowProductDetails: true,
    });
  };

  handleToggleFormAddProduct = (isShow) => {
    this.setState({
      isShowProductAdd: isShow,
    });
  };

  handleAddProduct = (product) => {
    const newProduct = {
      ...product,
      id: crypto.randomUUID(),
    };

    this.setState((prevState) => {
      return {
        shopData: [...prevState.shopData, newProduct],
      };
    });
  };

  render() {
    return (
      <div className="shop">
        <h1>{this.props.name}</h1>
        <h2>{this.props.address}</h2>
        <Products
          shopData={this.state.shopData}
          handleProductSelect={this.handleProductSelect}
          handleProductDelete={this.handleProductDelete}
          handleProductEdit={this.handleProductEdit}
          activeProductId={this.state.activeProductId}
        />
        {this.state.isShowProductInfo && (
          <ProductInfo selectedProduct={this.state.selectedProduct} />
        )}
        {this.state.isShowProductDetails && (
          <ProductDetails editedProduct={this.state.selectedProduct} />
        )}
        {this.state.isShowProductAdd && (
          <AddProduct
            onToggleFormAddProduct={this.handleToggleFormAddProduct}
            onAddProduct={this.handleAddProduct}
          />
        )}
        {!this.state.isShowProductAdd && (
          <button onClick={() => this.handleToggleFormAddProduct(true)}>Add new product</button>
        )}
      </div>
    );
  }
}

export default Shop;
