import { applyMiddleware, createStore as createReduxStore } from "redux";
import { connectRouter, routerMiddleware } from "connected-react-router";

import { middlewares as appMiddlewares } from "./middlewares";
import { composeWithDevTools } from "redux-devtools-extension";
import { ensure } from "@utils/contracts";
import { rootReducer } from "./root-reducer";

export function createStore(history) {
    ensure(history, "history", "store.createStore").isNotNull();

    const middlewares = [routerMiddleware(history), ...appMiddlewares];
    const enhancers = composeWithDevTools(applyMiddleware(...middlewares));
    const store = createReduxStore(connectRouter(history)(rootReducer), enhancers);

    return store;
}
