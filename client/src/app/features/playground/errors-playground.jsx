import React, { Component } from "react";
import { triggerAndHandleBadRequest, triggerBadRequest, triggerBadRequestwithEmptyResponse, triggerBadRequestwithHtmlResponse, triggerUnmanagedError } from "./actions";

import { bindActionCreators } from "redux";
import { connect } from "react-redux";

export class ErrorsPlaygroundComponent extends Component {
    triggerBadRequest = () => {
        const { triggerBadRequest } = this.props.actions;

        triggerBadRequest();
    };

    triggerBadRequestwithEmptyResponse = () => {
        const { triggerBadRequestwithEmptyResponse } = this.props.actions;

        triggerBadRequestwithEmptyResponse();
    };

    triggerBadRequestwithHtmlResponse = () => {
        const { triggerBadRequestwithHtmlResponse } = this.props.actions;

        triggerBadRequestwithHtmlResponse();
    };

    triggerAndHandleBadRequest = () => {
        const { triggerAndHandleBadRequest } = this.props.actions;

        triggerAndHandleBadRequest();
    };

    triggerUnmanagedError = () => {
        const { triggerUnmanagedError } = this.props.actions;

        triggerUnmanagedError();
    };

    render() {
        return (
            <div>
                <h2>Bad Request</h2>
                <button onClick={this.triggerBadRequest}>Trigger bad request</button>
                <button onClick={this.triggerBadRequestwithEmptyResponse}>Trigger bad request with empty response</button>
                <button onClick={this.triggerBadRequestwithHtmlResponse}>Trigger bad request with HTML response</button>
                <button onClick={this.triggerAndHandleBadRequest}>Trigger and handle bad request</button>
                <h2>Unmanaged Error</h2>
                <button onClick={this.triggerUnmanagedError}>Trigger an unmanaged error</button>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(
        {
            triggerBadRequest,
            triggerBadRequestwithEmptyResponse,
            triggerBadRequestwithHtmlResponse,
            triggerAndHandleBadRequest,
            triggerUnmanagedError
        },
        dispatch
    )
});

export const ErrorsPlayground = connect(
    null,
    mapDispatchToProps
)(ErrorsPlaygroundComponent);
