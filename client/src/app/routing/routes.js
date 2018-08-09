import { PRODUCTS_PATHS, productsRoutes } from "@features/products";
import { Route, Switch } from "react-router-dom";

import React from "react";
import { errorsRoutes } from "@features/errors";

export const PATHS = {
    ...PRODUCTS_PATHS
};

export const Routes = () => (
    <Switch>
        {productsRoutes}
        {errorsRoutes}
    </Switch>
);
