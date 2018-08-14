import React from "react";
import { Sidebar } from "./sidebar";

export const TwoColumns = props => (
    <div>
        <div>
            <Sidebar />
        </div>
        <div>{props.children}</div>
    </div>
);
