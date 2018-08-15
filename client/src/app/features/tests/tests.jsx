import React, { Component } from "react";
import { triggerBadRequest, triggerUnmanagedError } from "./actions";

import { bindActionCreators } from "redux";
import { connect } from "react-redux";

export class TestsComponent extends Component {
    triggerBadRequest = () => {
        const { triggerBadRequest } = this.props.actions;

        triggerBadRequest();
    };

    triggerUnmanagedError = () => {
        const { triggerUnmanagedError } = this.props.actions;

        triggerUnmanagedError();
    };

    render() {
        return (
            <div>
                <button onClick={this.triggerBadRequest}>Trigger bad request</button>
                <button onClick={this.triggerUnmanagedError}>Trigger an unmanaged error</button>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(
        {
            triggerBadRequest,
            triggerUnmanagedError
        },
        dispatch
    )
});

export const Tests = connect(
    null,
    mapDispatchToProps
)(TestsComponent);
