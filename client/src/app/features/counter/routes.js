import { Counter } from "./counter-page";
import React from "react";
import { Route } from "react-router-dom";

export const COUNTER_PATHS = {
    counter: "/"
};

export const counterRoutes = <Route path={COUNTER_PATHS.counter} component={Counter} exact />;
