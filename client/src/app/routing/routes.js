import { COUNTER_PATHS, counterRoutes } from "@features/counter";
import { PRODUCTS_PATHS, productsRoutes } from "@features/products";
import { Route, Switch } from "react-router-dom";

import React from "react";
import { errorsRoutes } from "@features/errors";

export const PATHS = {
    ...COUNTER_PATHS,
    ...PRODUCTS_PATHS
};

export const Routes = () => (
    <Switch>
        {counterRoutes}
        {productsRoutes}
        {errorsRoutes}
    </Switch>
);
