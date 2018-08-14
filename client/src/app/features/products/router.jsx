import { Route, Switch } from "react-router-dom";

import { AddProduct } from "./add/add-product-page";
import { ProductsListing } from "./listing/products-listing-page";
import React from "react";

export const ProductsRouter = () => (
    <Switch>
        <Route path="/products" component={ProductsListing} exact />
        <Route path="/products/add" component={AddProduct} />
    </Switch>
);
