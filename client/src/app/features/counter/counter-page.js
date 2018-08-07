import "./counter.css";

import React, { PureComponent } from "react";
import { increment, reset } from "@actions";

import { bindActionCreators } from "redux";
import { connect } from "react-redux";

class Component extends PureComponent {
    counterInterval = null;

    componentWillMount() {
        const { reset, increment } = this.props.actions;

        reset();

        this.counterInterval = setInterval(() => {
            increment();
        }, 3000);
    }

    render() {
        const { count } = this.props;

        return (
            <React.Fragment>
                <span className="timer">{count}</span>
            </React.Fragment>
        );
    }

    componentWillUnmount() {
        clearInterval(this.counterInterval);
    }
}

const mapStateToProps = (state, props) => ({
    ...props,
    count: state.counter.count
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(
        {
            reset,
            increment
        },
        dispatch
    )
});

export const Counter = connect(
    mapStateToProps,
    mapDispatchToProps
)(Component);
