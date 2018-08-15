import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";

import { Tests } from "./tests";

export class TestsRouter extends Component {
    render() {
        const { match } = this.props;

        return (
            <Switch>
                <Route path={match.path} component={Tests} exact />
            </Switch>
        );
    }
}
