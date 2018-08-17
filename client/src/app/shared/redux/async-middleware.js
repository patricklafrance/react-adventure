import { ensure } from "@utils/contracts";

export function asyncMiddleware(middleware) {
    ensure(middleware, "middleware", "redux.asyncMiddleware").isNotNull();

    return store => next => action => {
        const result = next(action);

        middleware(store, action);

        return result;
    };
}
