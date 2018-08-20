import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";

import { ErrorsPlayground } from "./errors-playground";

export class PlaygroundRouter extends Component {
    render() {
        const { match } = this.props;

        return (
            <Switch>
                <Route path={match.path} component={ErrorsPlayground} exact />
            </Switch>
        );
    }
}
