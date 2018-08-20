import React, { PureComponent } from "react";
import { getProducts, upvoteProduct } from "./actions";

import { NavLink } from "react-router-dom";
import { Product } from "./product";
import { connect } from "react-redux";

export class ProductsListingComponent extends PureComponent {
    componentWillMount() {
        this.props.dispatch(getProducts());
    }

    upvoteProduct = product => {
        this.props.dispatch(upvoteProduct(product.id));
    };

    render() {
        const { products } = this.props;

        const productList =
            products.length === 0 ? (
                <div>No products available</div>
            ) : (
                <ul>
                    {products.map((product, i) => (
                        <Product key={i} product={product} onUpvote={this.upvoteProduct} />
                    ))}
                </ul>
            );

        return (
            <React.Fragment>
                <h1>Product listing</h1>
                <div>
                    <NavLink to="/products/add">Add a new product</NavLink>
                </div>
                {productList}
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state, props) => {
    const { products } = state.products.listing;

    return { ...props, products };
};

export const ProductsListing = connect(
    mapStateToProps,
    null
)(ProductsListingComponent);
