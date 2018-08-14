import { App } from "@features/app";
import { ConnectedRouter } from "connected-react-router";
import { Provider } from "react-redux";
import React from "react";
import { createBrowserHistory } from "history";
import { createStore } from "@app/redux";
import { render } from "react-dom";

const history = createBrowserHistory();
const store = createStore(history);
const element = document.getElementById("app-container");

render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            {/* Maybe it should instead be an AppRouter */}
            <App />
        </ConnectedRouter>
    </Provider>,
    element
);
