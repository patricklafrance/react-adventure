import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";

import { UsersListing } from "./listing/users-listing-page";

export class UsersRouter extends Component {
    render() {
        const { match } = this.props;

        return (
            <Switch>
                <Route path={match.path} component={UsersListing} exact />
            </Switch>
        );
    }
}
