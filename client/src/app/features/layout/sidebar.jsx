import { NavLink } from "react-router-dom";
import React from "react";

const Sidebar = () => (
    <div>
        <ul>
            <li>
                <NavLink to="/products">Products</NavLink>
            </li>
            <li>
                <NavLink to="/products/add">Add A Product</NavLink>
            </li>
            <li>
                <NavLink to="/users">Users</NavLink>
            </li>
        </ul>
    </div>
);

export { Sidebar };
