import { ensure } from "@utils/contracts";

export function handler(handle) {
    ensure(handle, "handle", "redux.handler").isNotNull();

    return ({ dispatch, getState }) => next => action => {
        const result = next(action);

        handle(dispatch, action, getState);

        return result;
    };
}
