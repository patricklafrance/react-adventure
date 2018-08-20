import React, { PureComponent } from "react";

import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { getProductCount } from "./actions";

export class SidebarComponent extends PureComponent {
    componentWillMount() {
        this.props.dispatch(getProductCount());
    }

    render() {
        const { productsCount } = this.props;

        return (
            <div>
                <ul>
                    <li>
                        <NavLink to="/products">Products ({productsCount})</NavLink>
                    </li>
                    <li>
                        <NavLink to="/users">Users</NavLink>
                    </li>
                    <li>
                        <NavLink to="/playground">Playground</NavLink>
                    </li>
                </ul>
            </div>
        );
    }
}

const mapStateToProps = (state, props) => {
    const { productsCount } = state.layout.sidebar;

    return { ...props, productsCount };
};

export const Sidebar = connect(
    mapStateToProps,
    null
)(SidebarComponent);
