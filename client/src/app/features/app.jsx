import React from "react";
import { Router } from "@features/router";
import { TwoColumns } from "@features/layout";

export const App = () => (
    <TwoColumns>
        <Router />
    </TwoColumns>
);
