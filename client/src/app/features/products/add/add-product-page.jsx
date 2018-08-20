import React, { PureComponent } from "react";

import { CreateProductForm } from "./create-product-form";
import { connect } from "react-redux";
import { createProduct } from "./actions";

export class AddProductComponent extends PureComponent {
    createProduct = product => {
        this.props.dispatch(createProduct(product));
    };

    render() {
        return (
            <React.Fragment>
                <h1>Add a new product</h1>
                <CreateProductForm onSubmit2={this.createProduct} />
            </React.Fragment>
        );
    }
}

export const AddProduct = connect(
    null,
    null
)(AddProductComponent);
