import React, { PureComponent } from "react";

import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { getProducts } from "./actions";

export class ProductsListingComponent extends PureComponent {
    componentWillMount() {
        const { getProducts } = this.props.actions;

        getProducts();
    }

    render() {
        const { products } = this.props;

        const productList =
            products.length === 0 ? (
                <div>No products available</div>
            ) : (
                <ul>
                    {products.map((product, i) => (
                        <li key={i}>{product.name}</li>
                    ))}
                </ul>
            );

        return (
            <React.Fragment>
                <h1>Product listing</h1>

                {productList}
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state, props) => {
    const { products } = state.products.listing;

    return {
        ...props,
        products
    };
};

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(
        {
            getProducts
        },
        dispatch
    )
});

export const ProductsListing = connect(
    mapStateToProps,
    mapDispatchToProps
)(ProductsListingComponent);
