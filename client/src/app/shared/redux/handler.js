import { ensure } from "@utils/contracts";

export function handler(fct) {
    ensure(fct, "fct", "redux.handler").isNotNull();

    return ({ dispatch, getState }) => next => action => {
        next(action);
        fct({ dispatch, getState, action });
    };
}
