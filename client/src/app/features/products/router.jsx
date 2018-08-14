import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";

import { AddProduct } from "./add/add-product-page";
import { ProductsListing } from "./listing/products-listing-page";

export class ProductsRouter extends Component {
    render() {
        const { match } = this.props;

        return (
            <Switch>
                <Route path={match.path} component={ProductsListing} exact />
                <Route path={`${match.path}/add`} component={AddProduct} />
            </Switch>
        );
    }
}
