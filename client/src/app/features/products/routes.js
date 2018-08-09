import { ProductListing } from "./listing/product-listing-page";
import React from "react";
import { Route } from "react-router-dom";

export const PRODUCTS_PATHS = {
    products: {
        listing: "/products"
    }
};

export const productsRoutes = <Route path={PRODUCTS_PATHS.products.listing} component={ProductListing} />;
