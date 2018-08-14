import { AppRouter } from "@features/app-router";
import React from "react";
import { TwoColumns } from "@features/layout";

/*
    <Layout>
        <AppRouter />
    </Layout>
*/
export const App = () => (
    <TwoColumns>
        <AppRouter />
    </TwoColumns>
);
