import "@app/app.css";

import React from "react";
import { Routes } from "@routes";
import { Sidebar } from "@features/layout";

export const App = () => (
    <div>
        <div>
            <Sidebar />
        </div>
        <div>
            <Routes />
        </div>
    </div>
);
