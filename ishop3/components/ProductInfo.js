import React from 'react';

class ProductInfo extends React.Component {
	render() {

		return (
			<div className="product-info">
				<h2>Product info</h2>

				<p>{this.props.selectedProduct[0].title}</p>
				<p>Price: {this.props.selectedProduct[0].price}</p>
			</div>
		)
	}
}

export default ProductInfo;