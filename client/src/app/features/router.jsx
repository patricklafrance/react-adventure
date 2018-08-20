import { Redirect, Route } from "react-router-dom";

import { NotFound } from "@features/errors/not-found-page";
import { PlaygroundRouter } from "@features/playground";
import { ProductsRouter } from "@features/products";
import React from "react";
import { Switch } from "react-router-dom";
import { UnmanagedError } from "@features/errors/unmanaged-error-page";
import { UsersRouter } from "@features/users";

export const Router = () => (
    <Switch>
        <Redirect from="/" to="/products" exact />
        <Route path="/products" component={ProductsRouter} />
        <Route path="/users" component={UsersRouter} />
        <Route path="/playground" component={PlaygroundRouter} />
        <Route path="/error" component={UnmanagedError} />
        <Route component={NotFound} />
    </Switch>
);
