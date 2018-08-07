import { NavLink } from "react-router-dom";
import { PATHS } from "@routes";
import React from "react";

const Sidebar = () => (
    <div>
        <ul>
            <li>
                <NavLink to={PATHS.counter}>Counter</NavLink>
            </li>
            <li>
                <NavLink to={PATHS.products.listing}>Products</NavLink>
            </li>
        </ul>
    </div>
);

export { Sidebar };
