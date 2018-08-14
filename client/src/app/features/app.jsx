import { AppRouter } from "@features/app-router";
import React from "react";
import { TwoColumns } from "@features/layout";

export const App = () => (
    <TwoColumns>
        <AppRouter />
    </TwoColumns>
);
