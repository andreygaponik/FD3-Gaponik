import React from 'react';

class AddProduct extends React.Component {
  getInitialState = () => {
    return {
      product: {
        title: this.props.cardMode === 'edit' ? String(this.props.selectedProduct.title) : '',
        price: this.props.cardMode === 'edit' ? String(this.props.selectedProduct.price) : '',
        img: this.props.cardMode === 'edit' ? String(this.props.selectedProduct.img) : '',
        stock: this.props.cardMode === 'edit' ? String(this.props.selectedProduct.stock) : '',
        id: this.props.cardMode === 'edit' ? this.props.selectedProduct.id : '',
      },
      isShowErrors: false,
      isValidForm: true,
    };
  };

  state = this.getInitialState();

  handleCloseForm = (event) => {
    event.preventDefault();

    this.props.onResetCardMode();
  };

  handleInputChange = (event) => {
    const { name, value } = event.target;

    this.setState((prevState) => {
      const updatedProduct = {
        ...prevState.product,
        [name]: value,
      };

      const initialProduct = this.getInitialState().product;
      const hasChanges = Object.keys(updatedProduct).some(
        (key) => updatedProduct[key] !== initialProduct[key],
      );

      this.props.getChangesStatus(hasChanges);

      const hasEmptyFields =
        !updatedProduct.title.trim() ||
        !updatedProduct.price.trim() ||
        !updatedProduct.img.trim() ||
        !updatedProduct.stock.trim();

      return {
        product: updatedProduct,
        isShowErrors: hasEmptyFields,
        isValidForm: hasEmptyFields,
      };
    });
  };

  handleSaveForm = (event) => {
    event.preventDefault();

    if (
      !this.state.product.title.trim() ||
      !this.state.product.price.trim() ||
      !this.state.product.img.trim() ||
      !this.state.product.stock.trim()
    ) {
      this.setState({
        isShowErrors: true,
      });

      return;
    }

    if (this.props.cardMode === 'add') {
      this.props.onAddProduct({
        ...this.state.product,
        id: crypto.randomUUID(),
      });
      this.setState(this.getInitialState());
    } else if (this.props.cardMode === 'edit') {
      this.props.onEditProduct(this.state.product);
    }
  };

  render() {
    return (
      <div className="product-info">
        <h2>{this.props.cardMode === 'edit' ? 'Edit existing Product' : 'Add new Product'}</h2>

        <form>
          <input
            value={this.state.product.title}
            onChange={this.handleInputChange}
            placeholder="Title"
            name="title"
          />
          {this.state.isShowErrors && !this.state.product.title.trim() && (
            <p style={{ color: 'red' }}>Please, fill the field.</p>
          )}
          <input
            value={this.state.product.price}
            onChange={this.handleInputChange}
            placeholder="Price"
            name="price"
          />
          {this.state.isShowErrors && !this.state.product.price.trim() && (
            <p style={{ color: 'red' }}>Please, fill the field.</p>
          )}
          <input
            value={this.state.product.img}
            onChange={this.handleInputChange}
            placeholder="Image"
            name="img"
          />
          {this.state.isShowErrors && !this.state.product.img.trim() && (
            <p style={{ color: 'red' }}>Please, fill the field.</p>
          )}
          <input
            value={this.state.product.stock}
            onChange={this.handleInputChange}
            placeholder="Stock"
            name="stock"
          />
          {this.state.isShowErrors && !this.state.product.stock.trim() && (
            <p style={{ color: 'red' }}>Please, fill the field.</p>
          )}

          <button onClick={this.handleSaveForm} disabled={this.state.isValidForm}>
            Save
          </button>
          <button onClick={this.handleCloseForm}>Cancel</button>
        </form>
      </div>
    );
  }
}

export default AddProduct;
