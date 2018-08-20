import { ensure } from "@utils/contracts";

export function asyncMiddleware(handler) {
    ensure(handler, "handler", "redux.asyncMiddleware").isNotNull();

    return store => next => action => {
        const result = next(action);

        handler(store, action);

        return result;
    };
}
