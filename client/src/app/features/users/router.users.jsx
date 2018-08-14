import { Route, Switch } from "react-router-dom";

import React from "react";
import { UsersListing } from "./listing/page.users-listing";

export const UsersRouter = () => (
    <Switch>
        <Route path="/users" component={UsersListing} exact />
    </Switch>
);
