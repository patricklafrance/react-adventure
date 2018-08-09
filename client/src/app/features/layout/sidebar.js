import { NavLink } from "react-router-dom";
import { PATHS } from "@app/routing";
import React from "react";

// TODO: Is there a better way to gets routes than using a PATHS object?
const Sidebar = () => (
    <div>
        <ul>
            <li>
                <NavLink to={PATHS.products.listing}>Products</NavLink>
            </li>
        </ul>
    </div>
);

export { Sidebar };
