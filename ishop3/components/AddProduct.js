import React from 'react';

class AddProduct extends React.Component {
  state = {
    title: '',
    price: null,
    img: '',
    stock: null,
    id: null,
  };

  handleCloseForm = (event) => {
    event.preventDefault();

    this.props.onToggleFormAddProduct(false);
  };

  handleTitleChange = (event) => {
    this.setState({
      title: event.target.value,
    });
  };

  handleSaveForm = (event) => {
    event.preventDefault();

    this.props.onAddProduct(this.state);
  };

  render() {
    return (
      <div className="product-info">
        <h2>Add new product</h2>

        <form>
          <input value={this.state.title} onChange={this.handleTitleChange} placeholder="Title" />

          <button onClick={this.handleSaveForm}>Save</button>
          <button onClick={this.handleCloseForm}>Cancel</button>
        </form>
      </div>
    );
  }
}

export default AddProduct;
