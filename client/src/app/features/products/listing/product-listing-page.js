import React, { PureComponent } from "react";

import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { getProducts } from "./actions";

class Component extends PureComponent {
    componentWillMount() {
        const { getProducts } = this.props.actions;

        getProducts();
    }

    render() {
        const { products } = this.props;

        return (
            <React.Fragment>
                <h1>Product listing</h1>
                <ul>{products.map((product, i) => <li key={i}>{product.name}</li>)}</ul>
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

export const ProductListing = connect(
    mapStateToProps,
    mapDispatchToProps
)(Component);
