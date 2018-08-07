import { applyMiddleware, createStore as createReduxStore } from "redux";
import { connectRouter, routerMiddleware } from "connected-react-router";

import { composeWithDevTools } from "redux-devtools-extension";
import { rootReducer } from "@app/root-reducer";

export function createStore(history) {
  const enhancers = composeWithDevTools(
    applyMiddleware(routerMiddleware(history))
  );

  const store = createReduxStore(
    connectRouter(history)(rootReducer),
    enhancers
  );

  return store;
}
